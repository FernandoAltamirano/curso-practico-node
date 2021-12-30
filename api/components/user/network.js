const express = require("express");

const secure = require("./secure");
const response = require("../../../network/response.js");
const controller = require("./index");
const router = express.Router();

router.get("/", function (req, res, next) {
  controller
    .list()
    .then((list) => response.success(req, res, list, 200))
    .catch(next);
});

router.get("/:id", function (req, res, next) {
  controller
    .get(req.params.id)
    .then((user) => response.success(req, res, user, 200))
    .catch(next);
});
router.post("/", function (req, res, next) {
  controller
    .upsert(req.body)
    .then((user) => response.success(req, res, user, 201))
    .catch(next);
});
router.put("/:id", secure("update"), function (req, res, next) {
  controller
    .upsert(req.body, req.params.id)
    .then((user) => response.success(req, res, user, 201))
    .catch(next);
});

module.exports = router;
