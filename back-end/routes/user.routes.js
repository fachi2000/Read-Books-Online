const db = require("../models");
const User = db.users;

var express = require("express");
var router = express.Router();
const app = express();
const { authUser, authRole } = require("../middleware/rboAuth");

app.use(setUser);

var userController = require("../controllers/user.controller");

router.get("/", function (req, res, next) {
  res.json({ message: "Welcome to the user management subsystem api." });
});

// register a new user
router.post("/register", userController.register);

//login a user
router.post("/login", userController.login);

// Create a new user if permission
//router.post("/register", userController.create);

// Retrieve all users
router.get("/users", /*authRole("admin"),*/ userController.findAll);

// Retrieve a single user with id
router.get("/:id", userController.findOne);

// Update a user with id
router.put("/:id", userController.update);

// Delete a user with id
router.delete("/:id", userController.delete);

// Delete all users of the database
router.delete("/", userController.deleteAll);

function setUser(req, res, next) {
  const body = req.body;
  const userId = User.findOne({ _id: body.userId });
  if (userId) {
    req.currentUser = User.find((user) => user._id === userId);
  }
  next();
}

module.exports = router;
