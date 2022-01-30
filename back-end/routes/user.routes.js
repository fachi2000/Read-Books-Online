var express = require("express");
var router = express.Router();
const { authUser, authRole } = require("../rboAuth");

//Require controller
var userController = require("../controllers/user.controller");

router.get("/", function (req, res, next) {
  res.json({ message: "Welcome to the user management subsystem api." });
});

// Create a new user
router.post("/register", userController.register);

// Create a new user
//user/users/login
router.post("/login", userController.login);

// Retrieve all users
router.get("/users", authRole("admin"), userController.findAll);

// Retrieve a single user with id
router.get("/:id", userController.findOne);

// Update a user with id
router.put("/:id", userController.update);

// Delete a user with id
router.delete("/:id", userController.delete);

// Delete all users of the database
router.delete("/", userController.deleteAll);

module.exports = router;
