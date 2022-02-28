module.exports.respond = function (endpoint, socket) {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected" + socket.id);
  });
  socket.on("message", (value) => {
    console.log(value);
  });
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
};
