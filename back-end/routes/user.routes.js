const { authjwt } = require("../middleware");

var express = require("express");
var router = express.Router();

var userController = require("../controllers/user.controller");

router.get("/", function (req, res) {
  res.json({ message: "Welcome to the user api." });
});

// register a new user
router.post("/register", userController.register);

//login a user
router.post("/login", userController.login);

// Retrieve all users
router.get("/users", [authjwt.verifyToken], userController.findAll);

// Retrieve a single user with id
router.post("/users/find", userController.findOne);

// Update a user with id
router.put("/users/:id", userController.update);

// Delete a user with id
router.delete("/users/:id", userController.delete);

// Delete all users of the database
router.delete(
  "/users",
  /*userAuth, authRole("admin"),*/ userController.deleteAll
);

module.exports = router;
