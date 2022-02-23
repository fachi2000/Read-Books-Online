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
exports.findOne = async (req, res) => {
  const id = req.body.userId;
  var user = await User.findById(id);

  console.log(id);

  var searchTicket = req.body.searchTicket;

  //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
  var condition;

  if (user.role === "client" && searchTicket !== undefined) {
    condition = { userId: user.email, name: new RegExp(searchTicket, "i") };
  } else if (user.role !== "client" && searchTicket !== undefined) {
    condition = { name: new RegExp(searchTicket, "i") };
  } else {
    condition = { name: { $regex: /NOTFOUND/ } };
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
exports.approveTicket = (req, res) => {
  let myquery = { _id: req.params.id };
  Ticket.findOneAndUpdate(
    myquery,
    {
      $set: {
        purchased: true,
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
exports.setTicketPrice = async (req, res) => {
  let myquery = { _id: req.params.id };

  var condition;

  if (req.body.price < req.body.threshold) {
    condition = { price: req.body.price, purchased: true };
  } else {
    condition = { price: req.body.price, purchased: false };
  }

  Ticket.findOneAndUpdate(
    myquery,
    {
      $set: condition,
    },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully updated ticket.");
    }
  );

  var ticket = await Ticket.findById(req.params.id);

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: "fachiAafNode41@outlook.com",
      pass: "123123PP123",
    },
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  if (req.body.price < req.body.threshold) {
    var mailOptions = {
      from: '"Reed Books Online" <fachiAafNode41@outlook.com>',
      to: "fachi252@gmail.com",
      subject: "Thank you for your purchase!",
      text:
        "Hi! Thank you for your purchase at RBO! THe details are below:\n\n" +
        "Book name: " +
        ticket.name +
        "\n" +
        "Price:" +
        req.body.price +
        "£" +
        "\n\n" +
        "You can contact RBO any time. We hope to see you soon!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
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

// Update a Ticket by the id in the request
exports.denyTicket = (req, res) => {
  let myquery = { _id: req.params.id };

  Ticket.findOneAndUpdate(
    myquery,
    {
      $set: {
        needsMoreInfo: true,
        validatedBy: null,
        validationDate: null,
        price: null,
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

// Delete all Ticket from the database.
exports.deleteAll = (req, res) => {
  Ticket.remove({});
};
