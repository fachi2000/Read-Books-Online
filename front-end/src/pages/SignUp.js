import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css";
class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      repassword: "",
    };
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeRePassword = this.changeRePassword.bind(this);
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

  changeRePassword(event) {
    this.setState({
      repassword: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const postURL = "http://localhost:3050/user/register"; //Our previously set up route in the backend
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
      repassword: "",
    });
  }

  render() {
    return (
      <div>
        <div className="SignUp">
          <h2>Sign up to Read Books Online!</h2>
          <br></br>
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
              <label>Re-enter password</label>
              <input
                type="password"
                onChange={this.changeRePassword}
                value={this.state.repassword}
                className="form-control form-group"
                required
              ></input>
              <input
                type="submit"
                className="btn btn-success btn-block"
                value="Sign Up"
              ></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
