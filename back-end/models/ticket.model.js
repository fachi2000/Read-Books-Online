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
        immutable: true,
        default: Date.now,
      },
      price: Number,
      purchased: Boolean,
      userId: String,
    })
  );

  return Ticket;
};
