module.exports = {
  api: {
    port: process.env.API_PORT || 4000,
  },
  jwt: {
    secret: process.env.JWL_SECRET || "NotAseCret",
  },
};
