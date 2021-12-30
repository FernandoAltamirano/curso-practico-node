const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../utils/error");
const secret = config.jwt.secret;

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    //CPMPROBAR SI ES O NO  PROPIO
    if (decoded.id !== owner) {
      throw error("No puedes editar", 401);
    }
    return true;
  },
};

function sign(data) {
  return jwt.sign(data, secret);
}
function verify(token) {
  return jwt.verify(token, secret);
}
function getToken(auth) {
  if (!auth) {
    throw error("No hay token", 400);
  }
  if (!auth.startsWith("Bearer")) {
    throw error("Formato invalido", 400);
  }
  const token = auth.replace("Bearer ", "");
  return token;
}
function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;
  return decoded;
}

module.exports = {
  sign,
  check,
};
