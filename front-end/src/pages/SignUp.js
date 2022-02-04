import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(email, password).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="SignUp">
      <h2>Sign up to Read Books Online!</h2>
      <br></br>
      <div className="form-div">
        <form onSubmit={handleSignup}>
          <label>E-mail</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control form-group"
            required
          ></input>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control form-group"
            required
          ></input>
          <label>Re-enter password</label>
          <input
            type="password"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
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
  );
};

export default Signup;
