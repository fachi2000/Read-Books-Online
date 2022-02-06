import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import TicketsService from "../services/ticket.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

const Home = () => {
  const [privateTickets, setPrivateTickets] = useState([]);

  const [reqShow, setRequestShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [ticketId, setTicketId] = useState("");

  const [msg, setMsg] = useState(null);
  const msgDiv = msg ? (
    <div className="error">
      <p class="text-info">{msg}</p>
    </div>
  ) : (
    ""
  );
  const [bookName, setBookName] = useState("");
  const [newBookName, setNewBookName] = useState("");

  const handleRequestClose = () => setRequestShow(false);
  const handleRequestShow = () => {
    setMsg("");
    setRequestShow(true);
  };

  const handleEditClose = () => setEditShow(false);
  const handleEditShow = (e, id) => {
    setMsg("");
    setTicketId(id);
    setEditShow(true);
  };

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = (e, id) => {
    setMsg("");
    setTicketId(id);
    setDeleteShow(true);
  };

  const navigate = useNavigate();

  const user = AuthService.getCurrentUser();

  const handleRequest = (e) => {
    e.preventDefault();
    if (bookName !== "") {
      TicketsService.createTicket(bookName, user.id);
      setMsg("Request submitted succesfully");
    } else {
      setMsg("Please enter a value");
    }
  };

  const handleDelete = (e, _id) => {
    e.preventDefault();
    TicketsService.deleteTicket(_id);
    setMsg("Deleted succesfully");
  };

  const handleEdit = (e, ticketId, newName) => {
    e.preventDefault();
    if (newBookName !== "") {
      TicketsService.updateTicket(ticketId, newName);
      setMsg("Updated succesfully");
    } else {
      setMsg("Please enter a value");
    }
  };

  useEffect(() => {
    TicketsService.getTickets(/*user.id*/).then(
      (response) => {
        setPrivateTickets(response.data);
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
  }, []);

  return (
    <div className="Home">
      <h1 class="display-5">Welcome, here are all requests:</h1>
      <input
        style={{ width: 200 }}
        class="form-control"
        placeholder="Search request..."
        type="text"
      ></input>
      <br></br>
      {privateTickets.map(({ _id, name, dateCreated, validated, index }) => (
        <div key={index}>
          <div class="d-flex justify-content-between">
            <div>
              <h5>{name}</h5>
              <h6>
                Requested: {dateCreated.slice(0, 10)} at{" "}
                {dateCreated.slice(11, 16)}
              </h6>
              <h6>
                Validated:{" "}
                <span style={{ color: "#2986cc" }}>{validated.toString()}</span>
              </h6>
            </div>
            <div>
              <Button variant="primary" onClick={(e) => handleEditShow(e, _id)}>
                <BsFillPencilFill />
              </Button>
            </div>
            <div>
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
      <Button variant="primary" onClick={handleRequestShow}>
        Request new book
      </Button>
      <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter new information:
          <input
            type="text"
            value={newBookName}
            className="form-control form-group"
            onChange={(e) => setNewBookName(e.target.value)}
          ></input>
          {msgDiv}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(e) => handleEdit(e, ticketId, newBookName)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={reqShow} onHide={handleRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request new book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter book name:
          <input
            type="text"
            value={bookName}
            className="form-control form-group"
            onChange={(e) => setBookName(e.target.value)}
          ></input>
          {msgDiv}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRequestClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRequest}>
            Request
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this request?
          {msgDiv}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={(e) => handleDelete(e, ticketId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
