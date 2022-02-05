import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const errorDiv = error ? (
    <div className="error">
      <p class="text-danger">{error}</p>
    </div>
  ) : (
    ""
  );

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
          setError("Invalid e-mail or password");
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Login">
      <h2>Login up to Read Books Online</h2>
      <div className="form-div">
        <form onSubmit={handleLogin}>
          <label>E-mail</label>
          <input
            type="email"
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
          {errorDiv}
          <br></br>
          <input
            type="submit"
            className="btn btn-success btn-block"
            value="Log in"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Login;
