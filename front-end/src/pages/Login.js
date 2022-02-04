import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
        () => {
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
    <div>
      <div className="Login">
        <h2>Login up to Read Books Online!</h2>
        <div className="form-div">
          <form onSubmit={handleLogin}>
            <label>E-mail</label>
            <input
              type="text"
              value={email}
              className="form-control form-group"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <label>Password</label>
            <input
              type="password"
              value={password}
              className="form-control form-group"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
            <input
              type="submit"
              className="btn btn-success btn-block"
              value="Log in"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
