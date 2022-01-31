const db = require("../models");
const bcrypt = require("bcrypt");
const User = db.users;
//Git test comment
// Create and Save a new User

exports.register = async (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, saltPassword);
  // Create an User model object
  const user = new User({
    email: req.body.email,
    password: securePassword,
    role: "client", //client, employee, admin
  });

  // Save User in the database
  user
    .save()
    .then((data) => {
      console.log("User saved in the database: " + data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Here " + err.message ||
          "Some error occurred while creating the User.",
      });
    });
};

exports.login = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).json({ message: "Valid password" });
      req.curentUser = user;
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
  console.log(currentUser);
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  console.log(currUser);
  const username = req.query.email;
  //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
  var condition = username
    ? { username: { $regex: new RegExp(username), $options: "i" } }
    : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Find a single USer with an id
exports.findOne = (req, res) => {
  let myquery = { _id: req.params.id };

  User.findById(myquery)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retriving User with id: " + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  let myquery = { _id: req.params.id };
  let newUserName = req.body.username;
  User.findOneAndUpdate(
    myquery,
    req.body,
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully updated ticket.");
    }
  );
  User.findOneAndUpdate(
    myquery,
    { $set: { username: newUserName } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating User");
      } else {
        console.log("User has been updated");
      }
      console.log(doc);
    }
  );
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  let myquery = { _id: req.params.id };
  console.log(myquery);
  User.findOneAndDelete(myquery, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted User : ", docs);
    }
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.remove({});
};
