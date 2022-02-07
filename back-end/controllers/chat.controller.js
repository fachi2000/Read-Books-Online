module.exports.respond = function (endpoint, socket) {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected" + socket.id);
  });
};
