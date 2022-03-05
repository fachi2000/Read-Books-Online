import io from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const user = AuthService.getCurrentUser();

  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.getCurrentUser() == null) {
      AuthService.logout();
      navigate("/login");
      window.location.reload();
    }
    socketRef.current = io.connect("http://localhost:3050/chat");
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ message: e.target.value, name: user.email });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div class="d-flex flex-row p-1" key={index}>
        <div class="bg-white mr-2 p-1">
          <span class="text-muted">
            {name}:<br></br>
          </span>
          <span>
            <b>{message}</b>
          </span>
        </div>
      </div>
    ));
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
        {renderChat()}
        <div class="form-group px-3">
          <form class="form-group">
            <div className="messages-input">
              <input
                type="text"
                value={state.message}
                onChange={(e) => onTextChange(e)}
                className="form-control form-group"
                required
              ></input>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-success"
                onClick={onMessageSubmit}
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
