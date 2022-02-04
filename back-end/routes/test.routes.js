const { authjwt } = require("../middleware");
const controller = require("../controllers/test.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/test/users/public", controller.publicContent);

  app.get(
    "/test/users/private",
    [authjwt.verifyToken],
    controller.protectedContent
  );
};
