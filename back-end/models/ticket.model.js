module.exports = (mongoose) => {
  var Ticket = mongoose.model(
    "tickets",
    mongoose.Schema({
      name: String,
      validatedBy: String,
      validationDate: {
        type: Date,
        default: Date.now,
      },
      needsMoreInfo: Boolean,
      dateCreated: {
        type: Date,
        required: true,
        default: Date.now,
      },
      userId: String,
    })
  );

  return Ticket;
};
