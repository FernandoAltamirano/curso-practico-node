const controller = require("./controller");
const Store = require("../../../store/mysql");

module.exports = controller(Store);
