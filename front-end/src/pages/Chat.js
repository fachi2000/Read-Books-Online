import io from "socket.io-client";

import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [email, setEmail] = useState("");

  const socket = io.connect("http://localhost:3050/chat");
  const navigate = useNavigate();

  return (
    <div class="container d-flex justify-content-center">
      <div class="card mt-4 text">
        <div class="d-flex flex-row justify-content-between p-3 adiv bg-success text-white">
          {" "}
          <i class="fas fa-chevron-left"></i>{" "}
          <span class="pb-3">Live chat</span> <i class="fas fa-times"></i>{" "}
        </div>
        <div class="d-flex flex-row p-3">
          {" "}
          <img
            src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"
            width="30"
            height="30"
          />
          <div class="chat ml-2 p-3">Welcome to RBO</div>
        </div>
        <div class="d-flex flex-row p-3">
          <div class="bg-white mr-2 p-3">
            <span class="text-muted">Hi! I need help with a request.</span>
          </div>{" "}
          <img
            src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png"
            width="30"
            height="30"
          />
        </div>
        <div class="d-flex flex-row p-3">
          {" "}
          <img
            src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"
            width="30"
            height="30"
          />
        </div>
        <div class="d-flex flex-row p-3">
          {" "}
          <img
            src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"
            width="30"
            height="30"
          />
          <div class="chat ml-2 p-3">
            <span class="text-muted dot">. . .</span>
          </div>
        </div>
        <div class="form-group px-3">
          {" "}
          <textarea
            class="form-control"
            rows="5"
            placeholder="Type your message"
          ></textarea>{" "}
        </div>
      </div>
    </div>
  );
};

export default Chat;
