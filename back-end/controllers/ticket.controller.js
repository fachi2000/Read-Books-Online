const db = require("../models");

const Ticket = db.tickets;
const User = db.users;

var querystring = require("querystring");

//Welcome page
exports.start = (response) => {
  response.writeHead(200, { "Content-type": "text/plain" });
  response.write("Welcome to the ticket system");
  response.end();
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const ticket = new Ticket({
    name: req.body.name,
    date: req.body.date,
  });

  ticket
    .save()
    .then((ticketData) => {
      console.log("Ticket saved in the database: " + ticketData);

      // Now update the user by adding the association
      User.findByIdAndUpdate(
        req.body.userid, // //We assume userid is an attribute in the JSON
        { $push: { tickets: ticketData._id } },
        { new: true, useFindAndModify: false }
      ).then((userData) => {
        console.log(`The updated user: ${userData}`);
        // Returning the new Ticket
        res.send(ticketData);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ticket.",
      });
    });
};

// Retrieve all Tickets from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};
  Ticket.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tickets.",
      });
    });
};

// Find a single Ticket with an id
exports.findOne = (req, res) => {
  let myquery = { _id: req.params.id };

  Ticket.findById(myquery)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Ticket with id: " + myquery });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retriving Ticket with id: " + myquery });
    });
};

// Update a Ticket by the id in the request
exports.update = (req, res) => {
  //let myquery = { _id: req.body.id };
  let myquery = { _id: req.params.id };
  console.log(myquery);
  Ticket.findOneAndUpdate(
    myquery,
    req.body,
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully updated ticket.");
    }
  );
};

// Delete a Ticket with the specified id in the request
exports.delete = (req, res) => {
  let myquery = { _id: req.params.id };
  Ticket.findOneAndDelete(myquery, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted Ticket : ", docs);
    }
  });
};

// Delete all Ticket from the database.
exports.deleteAll = (req, res) => {
  Ticket.remove({});
};
