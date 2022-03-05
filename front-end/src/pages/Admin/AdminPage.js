import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsFillPencilFill, BsSearch } from "react-icons/bs";

const Home = () => {
  const [privateUsers, setPrivateUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const [reqShow, setRequestShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [searchUser, setSearchUser] = useState("");

  const [userId, setUserId] = useState("");

  const [msg, setMsg] = useState(null);
  const msgDiv = msg ? (
    <div className="error">
      <p class="text-info">{msg}</p>
    </div>
  ) : (
    ""
  );

  //admin can create an account
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");

  //New role for user selected
  const [newRole, setNewRole] = useState("");

  const handleRequestClose = () => setRequestShow(false);
  const handleRequestShow = () => {
    setMsg("");
    setRequestShow(true);
  };

  const handleEditClose = () => setEditShow(false);
  const handleEditShow = (e, id) => {
    setMsg("");
    setUserId(id);
    setNewRole("Choose Role");
    setEditShow(true);
  };

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = (e, id) => {
    setMsg("");
    setUserId(id);
    setDeleteShow(true);
  };

  const handleNewRole = (e) => {
    setNewRole(e);
    console.log(e);
  };

  const navigate = useNavigate();

  const user = AuthService.getCurrentUser();

  const retrieveUsers = () => {
    UserService.getUsers().then(
      (res) => {
        setPrivateUsers(res.data);
      },
      (error) => {
        console.log("Private page", error.response);
        // Invalid token
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    );
  };

  const handleRequest = (e) => {
    e.preventDefault();
    if (email !== "" || psw !== "") {
      UserService.createUser(email, psw);
      setRequestShow(false);
      retrieveUsers();
    } else {
      setMsg("Please enter a value");
    }
  };

  const handleDelete = (e, _id) => {
    e.preventDefault();
    UserService.deleteUser(_id);
    setDeleteShow(false);
    retrieveUsers();
  };

  const handleEdit = (e, userId, role) => {
    e.preventDefault();
    console.log(newRole);
    if (newRole !== "" && newRole !== "Choose Role") {
      UserService.updateUser(userId, role.toLowerCase());
      setEditShow(false);
      retrieveUsers();
    } else {
      setMsg("Please choose a role");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    UserService.findUsers(searchUser).then(
      (response) => {
        setPrivateUsers(response.data);
      },
      (error) => {
        console.log("Could not retrieve specified user", error.response);
      }
    );
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      UserService.getUsers().then(
        (res) => {
          setPrivateUsers(res.data);
        },
        (error) => {
          console.log("Private page", error.response);
          // Invalid token
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        }
      );
    } else {
      navigate("/home");
      window.location.reload();
    }
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = privateUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="Home">
      <h1 class="display-5">Admin, here are all users:</h1>

      <div class="d-flex flex-row">
        <input
          style={{ width: 200 }}
          class="form-control"
          placeholder="Search user..."
          type="text"
          onChange={(e) => setSearchUser(e.target.value)}
        ></input>
        <Button variant="light" onClick={(e) => handleSearch(e, searchUser)}>
          <BsSearch />
        </Button>
      </div>
      <br></br>
      {currentUsers.map(({ _id, email, dateCreated, role, index }) => (
        <div key={index}>
          <div class="d-flex justify-content-between">
            <div>
              <h5>{email}</h5>
              <h6>
                User created: {dateCreated.slice(0, 10)} at{" "}
                {dateCreated.slice(11, 16)}
              </h6>
              <h6>Role: {role}</h6>
            </div>

            <div>
              <div class="mb-1">
                <Button
                  variant="primary"
                  onClick={(e) => handleEditShow(e, _id)}
                >
                  <BsFillPencilFill />
                </Button>
              </div>
              <Button
                variant="danger"
                onClick={(e) => handleDeleteShow(e, _id)}
              >
                <BsFillTrashFill />
              </Button>
            </div>
          </div>
          <hr></hr>
        </div>
      ))}
      <Pagination
        requestsPerPage={usersPerPage}
        totalRequests={privateUsers.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      <Button variant="primary" onClick={handleRequestShow}>
        Create new user
      </Button>

      <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown onSelect={handleNewRole}>
            Please select the new role for the user:
            <Dropdown.Toggle variant="light">{newRole}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Client">Client</Dropdown.Item>
              <Dropdown.Item eventKey="Employee">Employee</Dropdown.Item>
              <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {msgDiv}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(e) => handleEdit(e, userId, newRole)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={reqShow} onHide={handleRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter email:
          <input
            type="email"
            value={email}
            className="form-control form-group"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          Enter Password:
          <input
            type="password"
            value={psw}
            className="form-control form-group"
            onChange={(e) => setPsw(e.target.value)}
          ></input>
          {msgDiv}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRequestClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRequest}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
          {msgDiv}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={(e) => handleDelete(e, userId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
