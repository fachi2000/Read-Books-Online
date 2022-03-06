module.exports.respond = function (endpoint, socket) {
  socket.on("disconnect", () => {
    console.log("User disconnected" + socket.id);
  });
  socket.on("message", (payload) => {
    console.log("Message received on server: ", payload);
    endpoint.emit("message", payload);
  });
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
};
