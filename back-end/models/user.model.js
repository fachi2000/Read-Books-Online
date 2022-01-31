var validator = require("validator");

module.exports = (mongoose) => {
  var User = mongoose.model(
    "user",
    mongoose.Schema({
      email: {
        type: String,
        required: true,
        lowercase: true,
        //validate: [isEmail, "Please enter a valid email"],
      },
      password: {
        type: String,
        required: true,
        minLength: [6, "Minimim password length is 6 characters"],
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
