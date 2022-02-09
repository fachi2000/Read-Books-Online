const db = require("../models");

const Ticket = db.tickets;
const User = db.users;
var nodemailer = require("nodemailer");

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
    needsMoreInfo: false,
    userId: req.body.userId,
  });

  ticket
    .save()
    .then((ticketData) => {
      console.log("Ticket saved in the database: " + ticketData);

      // Now update the user by adding the association
      User.findByIdAndUpdate(
        req.body.userId, // //We assume userid is an attribute in the JSON
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
exports.findAll = async (req, res) => {
  const name = req.query.name;
  const id = req.userId;
  var user = await User.findById(id);
  //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
  var condition;
  if (user.role === "client") {
    condition = { userId: user.email };
  } else {
    condition = {};
  }
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
  let myquery = { _id: req.params.id };

  Ticket.findOneAndUpdate(
    myquery,
    {
      $set: {
        name: req.body.name,
        needsMoreInfo: false,
      },
    },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully updated ticket.");
    }
  );
};

// Update a Ticket by the id in the request
exports.validate = (req, res) => {
  let myquery = { _id: req.params.id };

  Ticket.findOneAndUpdate(
    myquery,
    {
      $set: {
        validatedBy: req.body.userId,
        validationDate: new Date(),
        needsMoreInfo: false,
      },
    },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully updated ticket.");
    }
  );
};

// Update a Ticket by the id in the request
exports.setTicketPrice = (req, res) => {
  let myquery = { _id: req.params.id };

  Ticket.findOneAndUpdate(
    myquery,
    {
      $set: {
        price: req.body.price,
      },
    },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully updated ticket.");
    }
  );
};

// Update a Ticket by the id in the request
exports.return = (req, res) => {
  let myquery = { _id: req.params.id };

  Ticket.findOneAndUpdate(
    myquery,
    {
      $set: {
        needsMoreInfo: true,
      },
    },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully updated ticket.");
    }
  );
};

// Delete a Ticket with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Ticket.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Ticket with id=${id}. Maybe Ticket was not found!`,
        });
      } else {
        res.send({
          message: "Ticket was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Ticket with id=" + id,
      });
    });
};

exports.sendMail = (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "b8024030@my.shu.ac.uk",
      pass: "dummy",
    },
  });

  var mailOptions = {
    from: "b8024030@my.shu.ac.uk",
    to: req.body.userId,
    subject: "Read Books Online",
    text: "You purchased a book!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Delete all Ticket from the database.
exports.deleteAll = (req, res) => {
  Ticket.remove({});
};
