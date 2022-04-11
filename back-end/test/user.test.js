let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app").app;
let should = chai.should();

chai.use(chaiHttp);

//the parent block
describe("Testing the /user path", () => {
  //Testing GET /user
  describe("GET /user", () => {
    it("it should return a welcome message", (done) => {
      chai
        .request(server)
        .get("/user")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.should.have
            .property("message")
            .eql("Welcome to the user api.");
          done();
        });
    });
  });

  describe("GET /user/users", () => {
    it("it should not GET all as needs auth", (done) => {
      chai
        .request(server)
        .get("/user/users")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
  //POST
  describe("POST /user/register", () => {
    it("it should not POST an user without name field", (done) => {
      let user = {
        password: "123",
      };
      chai
        .request(server)
        .post("/user/register")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.be.eql("Content can not be empty!");
          done();
        });
    });
    it("it should POST a user ", (done) => {
      let user = {
        email: "chai@chai.com",
        password: "123",
      };
      chai
        .request(server)
        .post("/user/register")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("email");
          res.body.should.have.property("password");
          done();
        });
    });
  });
  //PUT
  describe("update the role of the use to employee ", () => {
    it("should update role from client to employee", (done) => {
      const newRole = {
        role: "client",
      };
      chai
        .request(server)
        .put("/user/users/62234c6a95bd82808ecd716a")
        .send(newRole)
        .end(function (err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });

  //DELETE
  describe("user should be deleted ", () => {
    it("should delete the user specified", (done) => {
      chai
        .request(server)
        .delete("/user/users/62234c1495bd82808ecd7168")
        .end(function (err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });
});
