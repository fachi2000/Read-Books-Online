import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import TicketsService from "../services/ticket.service";
import AuthService from "../services/auth.service";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [privateTickets, setPrivateTickets] = useState([]);
  const [show, setShow] = useState(false);
  const [bookName, setBookName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  useEffect(() => {
    TicketsService.getTickets().then(
      (response) => {
        setPrivateTickets(response.data);
        console.log(privateTickets);
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
      {privateTickets.map(({ name, dateCreated, index }) => (
        <div key={index}>
          <ul class="list-group">
            <li class="list-group-item">Book name: {name}</li>
            <li class="list-group-item">Date requested: {dateCreated}</li>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
