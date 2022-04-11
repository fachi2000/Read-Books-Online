let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app").app;
let should = chai.should();

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
    it("it should not GET all the tickets as needs auth", (done) => {
      chai
        .request(server)
        .get("/ticket/tickets")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
  //POST
  describe("POST /ticket/create", () => {
    it("it should not POST a ticket without name field", (done) => {
      let ticket = {
        needsMoreInfo: false,
        userId: "client@client.com",
      };
      chai
        .request(server)
        .post("/ticket/create")
        .send(ticket)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.be.eql("Content can not be empty!");
          done();
        });
    });
    it("it should POST a ticket ", (done) => {
      let ticket = {
        name: "The Chai Test",
        needsMoreInfo: false,
        userId: "client@client.com",
      };
      chai
        .request(server)
        .post("/ticket/create")
        .send(ticket)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("name");
          res.body.should.have.property("needsMoreInfo");
          res.body.should.have.property("userId");
          done();
        });
    });
  });
  //PUT
  describe("update the ticket name to Karate: ", () => {
    it("should update the name from THe Chai Test to ChaiEdited", (done) => {
      const newTicket = {
        name: "Karate",
      };
      chai
        .request(server)
        .put("/ticket/tickets/6222843707fa215e50fc8ee8")
        .send(newTicket)
        .end(function (err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });
  //DELETE
  describe("ticket should be deleted ", () => {
    it("should delete the ticket specified", (done) => {
      chai
        .request(server)
        .delete("/ticket/tickets/622287a007fa215e50fc8f10")
        .end(function (err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });
});
