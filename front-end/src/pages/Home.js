import React, { useState, useEffect } from "react";
import TicketsService from "../services/ticket.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [privateTickets, setPrivateTickets] = useState([]);

  const navigate = useNavigate();

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
      <h3>
        <h3>{privateTickets.map((post) => post.content)}</h3>
      </h3>
      <h4>Here are your tickets:</h4>
      <table className="table table-sm table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
      </table>
      <button className="btn btn-primary">Request ticket</button>
    </div>
  );
};

export default Home;
