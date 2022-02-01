module.exports = (mongoose) => {
  var Ticket = mongoose.model(
    "tickets",
    mongoose.Schema({
      name: String,
      validated: Boolean,
      needsMoreInfo: Boolean,
      dateCreated: {
        type: Date,
        required: true,
        default: Date.now,
      },
    })
  );

  return Ticket;
};
