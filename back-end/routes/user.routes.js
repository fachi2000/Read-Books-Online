const { authjwt } = require("../middleware");

var express = require("express");
var router = express.Router();

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
router.get("/users", [authjwt.verifyToken], userController.findAll);

// Retrieve a single user with id
router.get("/:id", /*authRole("admin"),*/ userController.findOne);

// Update a user with id
router.put("/:id", /*authRole("admin"),*/ userController.update);

// Delete a user with id
router.delete("/:id", /*authRole("admin"),*/ userController.delete);

// Delete all users of the database
router.delete("/", /*userAuth, authRole("admin"),*/ userController.deleteAll);

module.exports = router;
