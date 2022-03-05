module.exports.respond = function (endpoint, socket) {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected" + socket.id);
  });
  socket.on("message", ({ name, message }) => {
    console.log("Message sent: " + message);
    socket.emit("message", { name, message });
  });
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
};
