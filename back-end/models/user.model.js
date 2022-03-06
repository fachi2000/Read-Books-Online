module.exports = (mongoose) => {
  var User = mongoose.model(
    "user",
    mongoose.Schema({
      email: {
        type: String,
        required: true,
        lowercase: true,
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
      dateCreated: {
        type: Date,
        required: true,
        default: Date.now,
        immutable: true,
      },
    })
  );
  return User;
};
