const express = require("express");

const secure = require("./secure");
const response = require("../../../network/response.js");
const controller = require("./index");
const router = express.Router();

router.get("/", function (req, res) {
  controller
    .list()
    .then((list) => response.success(req, res, list, 200))
    .catch((error) => response.error(req, res, error.message, 500));
});

router.get("/:id", function (req, res) {
  controller
    .get(req.params.id)
    .then((user) => response.success(req, res, user, 200))
    .catch((error) => response.error(req, res, error.message, 500));
});
router.post("/", function (req, res) {
  controller
    .upsert(req.body)
    .then((user) => response.success(req, res, user, 201))
    .catch((error) => response.error(req, res, error.message, 500));
});
router.put("/", secure("update"), function (req, res) {
  controller
    .upsert(req.body)
    .then((user) => response.success(req, res, user, 201))
    .catch((error) => response.error(req, res, error.message, 500));
});

module.exports = router;
