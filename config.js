require("dotenv").config();

module.exports = {
  api: {
    port: process.env.API_PORT || 4000,
  },
  jwt: {
    secret: process.env.JWL_SECRET || "NotAseCret",
  },
  mysql: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
};
