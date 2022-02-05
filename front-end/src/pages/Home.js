import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import TicketsService from "../services/ticket.service";
import AuthService from "../services/auth.service";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [privateTickets, setPrivateTickets] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const errorDiv = error ? (
    <div className="error">
      <p class="text-info">{error}</p>
    </div>
  ) : (
    ""
  );
  const [bookName, setBookName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const user = AuthService.getCurrentUser();

  const handleRequest = (e) => {
    e.preventDefault();
    if (bookName !== "") {
      TicketsService.createTicket(bookName, user.id);
      setError("Request submitted succesfully");
    } else {
      setError("Please enter a value");
    }
  };

  const handleDelete = (e, _id) => {
    e.preventDefault();
    TicketsService.deleteTicket(_id);
  };

  useEffect(() => {
    TicketsService.getTickets(user.id).then(
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
      <h1 class="display-5">Welcome {user.role}, here are all requests:</h1>
      {privateTickets.map(({ _id, name, dateCreated, validated, index }) => (
        <div key={index}>
          <div class="d-flex justify-content-between">
            <div>
              <h5>{name}</h5>
              <h6>
                Requested: {dateCreated.slice(0, 10)} at{" "}
                {dateCreated.slice(11, 16)}
              </h6>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-danger"
                onClick={(e) => handleDelete(e, _id)}
              >
                Cancel Request
              </button>
            </div>
          </div>
          <hr></hr>
        </div>
      ))}

      <Button variant="primary" onClick={handleShow}>
        Request new book
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter book name:
          <input
            type="text"
            value={bookName}
            className="form-control form-group"
            onChange={(e) => setBookName(e.target.value)}
          ></input>
          {errorDiv}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRequest}>
            Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
