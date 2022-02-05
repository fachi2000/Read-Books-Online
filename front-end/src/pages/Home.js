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
      axios
        .post("http://localhost:3050/ticket/create", {
          name: bookName,
          userId: user.id,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setError("Request submitted succesfully");
    } else {
      setError("Please enter a value");
    }
  };

  useEffect(() => {
    TicketsService.getTickets().then(
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
      <h4>Welcome, here are all requests:</h4>
      {privateTickets.map(({ name, dateCreated, validated, index }) => (
        <div key={index}>
          <ul class="list-group">
            <li class="list-group-item">
              <b>Book name:</b> {name} <br></br>
              <b>Date requested: </b>
              {dateCreated.slice(0, 10)} at {dateCreated.slice(11, 16)}
              <br></br>
              <b>Validated: </b>
              {validated.toString()}
            </li>
          </ul>
          <br></br>
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
