module.exports = (mongoose) => {
  var Ticket = mongoose.model(
    "tickets",
    mongoose.Schema({
      name: String,

      dateCreated: {
        type: Date,
        required: true,
        default: Date.now,
      },
    })
  );

  return Ticket;
};
