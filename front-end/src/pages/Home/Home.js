import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import TicketsService from "../../services/ticket.service";
import AuthService from "../../services/auth.service";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsCheckCircleFill,
  BsSearch,
  BsCurrencyPound,
  BsFillFlagFill,
} from "react-icons/bs";

const Home = () => {
  const [privateTickets, setPrivateTickets] = useState([]);

  const [threshold, setThreshold] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(3);

  const [reqShow, setRequestShow] = useState(false);
  const [validateShow, setValidateShow] = useState(false);
  const [priceShow, setPriceShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [approveShow, setApproveShow] = useState(false);

  const [ticketId, setTicketId] = useState("");

  const [searchTicket, setSearchTicket] = useState("");

  const [msg, setMsg] = useState(null);
  const [msgColor, setMsgColor] = useState("");

  const msgDiv = msg ? (
    <div class={msgColor}>
      <p class={msgColor}>{msg}</p>
    </div>
  ) : (
    ""
  );
  const [bookName, setBookName] = useState("");
  const [newBookName, setNewBookName] = useState("");
  const [price, setPrice] = useState("");

  const handleRequestClose = () => setRequestShow(false);
  const handleRequestShow = () => {
    setMsg("");
    setBookName("");
    setRequestShow(true);
  };

  const handleApproveClose = () => setApproveShow(false);
  const handleApproveShow = (e, id) => {
    setMsg("");
    setTicketId(id);
    setApproveShow(true);
  };

  const handleValidateClose = () => setValidateShow(false);
  const handleValidateShow = (e, id) => {
    setMsg("");
    setTicketId(id);
    setValidateShow(true);
  };

  const handlePriceClose = () => setPriceShow(false);
  const handlePriceShow = (e, id) => {
    setMsg("");
    setTicketId(id);
    setPriceShow(true);
  };

  const handleEditClose = () => setEditShow(false);
  const handleEditShow = (e, id) => {
    setMsg("");
    setNewBookName("");
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

  const generateThreshold = () => {
    const newThreshold = 30;
    setThreshold(newThreshold);
  };

  const calculatePage = () => {};

  const retrieveTickets = () => {
    TicketsService.getTickets(user).then(
      (res) => {
        setPrivateTickets(res.data);
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
    if (bookName !== "") {
      TicketsService.createTicket(bookName, user.email);
      setRequestShow(false);
    } else {
      setMsgColor("text-danger");
      setMsg("Please enter a value");
    }
    retrieveTickets();
  };

  const handleSetPrice = (e, price) => {
    e.preventDefault();
    console.log("PRICE" + price);
    if (price !== "" && price > 0) {
      TicketsService.setTicketPrice(ticketId, price, threshold);
      setPriceShow(false);
      retrieveTickets();
    } else {
      setMsgColor("text-danger");
      setMsg("Please enter a value or a greater value than 0");
    }
  };

  const handleValidation = (e) => {
    e.preventDefault();

    TicketsService.validateTicket(ticketId, user.email);
    setMsgColor("text-success");
    setMsg("Ticket has been validated");
    setValidateShow(false);
    retrieveTickets();
  };

  const handleMoreInformation = (e, ticketID) => {
    e.preventDefault();
    TicketsService.returnTicket(ticketID);
    setValidateShow();
    retrieveTickets();
  };

  const handleApprove = (e, ticketID) => {
    e.preventDefault();
    TicketsService.approveTicket(ticketID);
    setApproveShow(false);
    retrieveTickets();
  };

  const handleDeny = (e, ticketID) => {
    e.preventDefault();
    TicketsService.denyTicket(ticketID);
    setMsgColor("text-danger");
    setMsg("Ticket has been denied");
    setApproveShow(false);
    retrieveTickets();
  };

  const handleDelete = (e, _id) => {
    e.preventDefault();
    TicketsService.deleteTicket(_id);
    setMsgColor("text-success");
    setDeleteShow(false);
    retrieveTickets();
  };

  const handleEdit = (e, ticketId, newName) => {
    e.preventDefault();
    if (newBookName !== "") {
      TicketsService.updateTicket(ticketId, newName);
      setEditShow(false);
      retrieveTickets();
    } else {
      setMsgColor("text-danger");
      setMsg("Please enter a value");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    TicketsService.findTickets(user.id, searchTicket).then(
      (response) => {
        setPrivateTickets(response.data);
      },
      (error) => {
        console.log("Could not retrieve specified ticket", error.response);
      }
    );
  };

  useEffect(() => {
    generateThreshold();

    TicketsService.getTickets(user).then(
      (res) => {
        setPrivateTickets(res.data);
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
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = privateTickets.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="Home">
      <h1 class="display-5">Welcome, here are all requests:</h1>
      <div class="d-flex flex-row">
        <input
          style={{ width: 200 }}
          class="form-control"
          placeholder="Search request..."
          type="text"
          onChange={(e) => setSearchTicket(e.target.value)}
        ></input>
        <Button variant="light" onClick={(e) => handleSearch(e, searchTicket)}>
          <BsSearch />
        </Button>
      </div>
      <br></br>
      {privateTickets.length > 0 ? (
        currentRequests.map(
          ({
            _id,
            name,
            dateCreated,
            validatedBy,
            validationDate,
            needsMoreInfo,
            userId,
            price,
            purchased,
            index,
          }) => (
            <div
              key={index}
              style={{
                backgroundColor: purchased === true ? "#E5FFDA" : "white",
              }}
            >
              <div class="d-flex justify-content-between">
                <div>
                  <h4>
                    <b>{name}</b>
                  </h4>
                  <h6>
                    <i>Requested:</i> {dateCreated.slice(0, 10)} at{" "}
                    {dateCreated.slice(11, 16)}
                  </h6>
                  {validatedBy && (
                    <h6>
                      <i>Validated by:</i>{" "}
                      <span style={{ color: "#2986cc" }}> {validatedBy}</span>
                    </h6>
                  )}
                  {validatedBy && (
                    <h6>
                      <i>Validation date:</i> {validationDate.slice(0, 10)}{" "}
                      {validationDate && validationDate.slice(11, 16)}
                    </h6>
                  )}
                  {needsMoreInfo && (
                    <h6>
                      <i>Needs more information:</i> {needsMoreInfo.toString()}
                    </h6>
                  )}
                  {price && (
                    <h6>
                      <i>Price:</i>{" "}
                      <span style={{ color: "#2986cc" }}> {price}&#163;</span>
                    </h6>
                  )}
                </div>
                <div>
                  <b>Created by:</b> {userId}
                </div>
                <div>
                  {user && !purchased && price && user.role === "admin" && (
                    <div className="mb-1">
                      <Button
                        variant="success"
                        onClick={(e) => handleApproveShow(e, _id)}
                      >
                        <BsCheckCircleFill />
                      </Button>
                    </div>
                  )}
                  {user &&
                    !validatedBy &&
                    !needsMoreInfo &&
                    user.role === "employee" && (
                      <div className="mb-1">
                        <Button
                          style={{ color: "white" }}
                          variant="info"
                          onClick={(e) => handleValidateShow(e, _id)}
                        >
                          <BsFillFlagFill />
                        </Button>
                      </div>
                    )}
                  {user && validatedBy && !price && user.role === "employee" && (
                    <div className="mb-1">
                      <Button
                        variant="warning"
                        onClick={(e) => handlePriceShow(e, _id)}
                      >
                        <BsCurrencyPound />
                      </Button>
                    </div>
                  )}

                  {user &&
                    !purchased &&
                    !price &&
                    !validatedBy &&
                    user.role === "client" && (
                      <div className="mb-1">
                        <Button
                          variant="primary"
                          onClick={(e) => handleEditShow(e, _id)}
                        >
                          <BsFillPencilFill />
                        </Button>
                      </div>
                    )}

                  {!validationDate ||
                  user.role == "admin" ||
                  user.role == "employee" ? (
                    <Button
                      variant="danger"
                      onClick={(e) => handleDeleteShow(e, _id)}
                    >
                      <BsFillTrashFill />
                    </Button>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
              <hr></hr>
            </div>
          )
        )
      ) : (
        <b>
          There are no requests at the moment.<hr></hr>
        </b>
      )}
      <Pagination
        requestsPerPage={requestsPerPage}
        totalRequests={privateTickets.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {user && user.role === "client" && (
        <Button variant="primary" onClick={handleRequestShow}>
          Request new book
        </Button>
      )}
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
      <Modal show={validateShow} onHide={handleValidateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Validate request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to validate this request?
          {msgDiv}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(e) => handleMoreInformation(e, ticketId)}
          >
            +Info
          </Button>
          <Button variant="info" onClick={(e) => handleValidation(e)}>
            Validate
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={priceShow} onHide={handlePriceClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please set the price:
          <input
            type="number"
            value={price}
            className="form-control form-group"
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          {msgDiv}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePriceClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={(e) => handleSetPrice(e, price)}>
            Set
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={approveShow} onHide={handleApproveClose}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to approve the request?
          {msgDiv}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={(e) => handleDeny(e, ticketId)}>
            Deny
          </Button>
          <Button variant="success" onClick={(e) => handleApprove(e, ticketId)}>
            Approve
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
