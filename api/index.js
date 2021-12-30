const express = require("express");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");

const swaggerDoc = require("./swagger.json");
const config = require("../config.js");
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const errors = require("../network/errors");
const app = express();

app.use(bodyParser.json());

app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(errors);

app.listen(config.api.port, () => {
  console.log(`LISTENING ON PORT ${config.api.port}`);
});
