module.exports = (mongoose) => {
  var User = mongoose.model(
    "user",
    mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String, //client, employee, admin
        required: true,
      },
      tickets: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "tickets",
        },
      ],
      dateCreated: {
        type: Date,
        required: true,
        default: Date.now,
      },
    })
  );
  return User;
};
