let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);
//the parent block
describe("backend root", () => {
  it("it should return a 404", () => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(404);
      });
  });
});
