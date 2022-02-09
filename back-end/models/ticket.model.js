module.exports = (mongoose) => {
  var Ticket = mongoose.model(
    "tickets",
    mongoose.Schema({
      name: String,
      validatedBy: String,
      validationDate: Date,
      needsMoreInfo: Boolean,
      dateCreated: {
        type: Date,
        required: true,
        default: Date.now,
      },
      price: Number,
      userId: String,
    })
  );

  return Ticket;
};
