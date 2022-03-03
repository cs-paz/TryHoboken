const express = require("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectID;

router.get("/", async (req, res) => {
  res.status(200).send({ test: "success" });
});

module.exports = router;
