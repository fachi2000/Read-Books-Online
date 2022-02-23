const { authjwt } = require("../middleware");

var express = require("express");
var router = express.Router();

//Require controller
var ticketController = require("../controllers/ticket.controller");

router.get("/", function (req, res, next) {
  res.json({ message: "Welcome to the ticket api" });
});

// Create a new ticket
router.post("/create", ticketController.create);

// Retrieve all tickets or filter
router.get("/tickets", [authjwt.verifyToken], ticketController.findAll);

// Retrieve a single ticket with id
router.post("/tickets/find", ticketController.findOne);

// Update a ticket with id
router.put("/tickets/:id", ticketController.update);

// Validate a ticket with id
router.put("/tickets/validate/:id", ticketController.validate);

//return ticket to client to add more information
router.put("/tickets/return/:id", ticketController.return);

//return ticket to client to add more information
router.put("/tickets/setPrice/:id", ticketController.setTicketPrice);

//approve ticket
router.put("/tickets/approve/:id", ticketController.approveTicket);

//approve ticket or not
router.put("/tickets/deny/:id", ticketController.denyTicket);

// Delete a ticket with id
router.delete("/tickets/:id", ticketController.delete);

// Delete all tickets of the database
router.delete("/tickets/", ticketController.deleteAll);

module.exports = router;
