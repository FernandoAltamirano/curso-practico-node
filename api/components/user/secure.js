const auth = require("../../../auth");

module.exports = function checkOut(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "update":
        const owner = req.params.id;
        auth.check.own(req, owner);
        next();
      default:
        next();
    }
  }
  return middleware;
};
