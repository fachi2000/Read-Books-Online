import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  changePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const postURL = "http://localhost:3050/users/users/login"; //Our previously set up route in the backend
    fetch(postURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    });

    //window.location('/')
    this.setState({
      email: "",
      password: "",
    });
  }

  render() {
    return (
      <div>
        <div className="Login">
          <h2>Login up to Read Books Online!</h2>
          <div className="form-div">
            <form onSubmit={this.onSubmit}>
              <label>E-mail</label>
              <input
                type="email"
                onChange={this.changeEmail}
                value={this.state.email}
                className="form-control form-group"
                required
              ></input>
              <label>Password</label>
              <input
                type="password"
                onChange={this.changePassword}
                value={this.state.password}
                className="form-control form-group"
                required
              ></input>
              <input
                type="submit"
                className="btn btn-success btn-block"
                value="Log in"
              ></input>
            </form>
          </div>
          <input
            type="submit"
            className="btn btn-success btn-block"
            value="Sign up"
          ></input>
        </div>
      </div>
    );
  }
}

export default Login;
