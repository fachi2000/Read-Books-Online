const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tickets = require("./ticket.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);

module.exports = db;
