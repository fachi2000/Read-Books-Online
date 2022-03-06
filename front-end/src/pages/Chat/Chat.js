import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:3050/chat");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const userName = AuthService.getCurrentUser().email;

  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.getCurrentUser() == null) {
      AuthService.logout();
      navigate("/login");
      window.location.reload();
    }
    socket.on("message", (payload) => {
      setChat([...chat, payload]);
    });
  });

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    socket.emit("message", { userName, message });
    setMessage("");
  };

  const renderChat = () => {
    return chat.map((payload, index) => (
      <div class="d-flex flex-row p-1" key={index}>
        <div class="bg-white mr-2 p-1">
          <span class="text-muted">
            {payload.userName}:<br></br>
          </span>
          <span>
            <b>{payload.message}</b>
          </span>
        </div>
      </div>
    ));
  };
  const divStyle = {
    overflowY: "scroll",
    border: "none",
    width: "100%",
    float: "left",
    height: "300px",
    position: "relative",
  };

  return (
    <div class="container d-flex justify-content-center">
      <div class="card mt-4 text">
        <div class="d-flex flex-row justify-content-between p-3 adiv bg-success text-white">
          <i class="fas fa-chevron-left"></i> <span class="pb-3">Chat</span>
          <i class="fas fa-times"></i>
        </div>
        <div class="d-flex flex-row p-3">
          <div class="chat ml-2 p-3">
            <h5>Welcome to RBO Help Center</h5>
          </div>
        </div>
        <div style={divStyle}>{renderChat()}</div>

        <div class="form-group px-3">
          <form class="form-group">
            <div className="messages-input">
              <input
                type="text"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control form-group"
                placeholder="Type message..."
                required
              ></input>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-success"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
