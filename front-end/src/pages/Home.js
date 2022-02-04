import React, { Component } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Home extends Component {
  state = {
    tickets: [],
    error: null,
  };

  componentDidMount = () => {
    fetch("http://localhost:3050/ticket/tickets/")
      .then((response) => response.json())
      .then((data) => this.setState({ tickets: data }));
  };

  displayTicketList = (tickets) => {
    if (!tickets.length) return null;

    return tickets.map(({ name, date, index }) => (
      <tbody key={index}>
        <tr>
          <td>{name}</td>
          <td>{date}</td>
        </tr>
      </tbody>
    ));
  };

  render() {
    return (
      <div className="Home">
        <h4>Here are your tickets:</h4>
        <table className="table table-sm table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          {this.displayTicketList(this.state.tickets)}
        </table>
      </div>
    );
  }
}

export default Home;
