/*
ROLES:
CLIENT - hola@hola.com  |   123
EMPLOYEE - pepe@pepe.com  |   456
ADMIN - admin@admin.com  |   789
*/

function authUser(req, res, next) {
  if (req.currentUser == null) {
    res.status(403);
    return res.send("You need to log in");
  }
  next();
}

function authRole(role) {
  return (req, res, next) => {
    if (req.currUser.role !== role) {
      res.status(401);
      return res.send("You are not allowed");
    }
    next();
  };
}

module.exports = {
  authUser,
  authRole,
};
