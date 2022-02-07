import io from "socket.io-client";

import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [email, setEmail] = useState("");

  const socket = io.connect("http://localhost:3050/chat");
  const navigate = useNavigate();

  return (
    <div className="SignUp">
      <p>chat</p>
    </div>
  );
};

export default Chat;
