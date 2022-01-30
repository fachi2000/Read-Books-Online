let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

let mongoose = require("mongoose");
let Ticket = require("../models/ticket.model");

chai.use(chaiHttp);

//the parent block
describe("Testing the /ticket path", () => {
  //Testing GET /ticket
  describe("GET /ticket", () => {
    it("it should return a welcome message", (done) => {
      chai
        .request(server)
        .get("/ticket")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.should.have
            .property("message")
            .eql("Welcome to the ticket api");
          done();
        });
    });
  });

  describe("GET /ticket/tickets", () => {
    it("it should GET all the tickets", (done) => {
      chai
        .request(server)
        .get("/ticket/tickets")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.not.be.eql(0);
          done();
        });
    });
  });

  describe("POST /ticket/tickets", () => {
    it("it should not POST an ticket without name field", (done) => {
      let ticket = {
        name: "fran",
        date: "25/01/2022",
      };
      chai
        .request(server)
        .post("/ticket/tickets")
        .send(ticket)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.be.eql("Content can not be empty!");
          done();
        });
    });
    it("it should POST an ticket ", (done) => {
      let ticket = {
        name: "fido",
        date: "25/01/2022",
      };
      chai
        .request(server)
        .post("/tickets/ticket")
        .send(ticket)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("name");
          res.body.should.have.property("date");
          done();
        });
    });
  });
  //Finished POST /ticket/ticekts
});
