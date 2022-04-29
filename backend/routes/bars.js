const express = require("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectID;
const { getAllBars, getBarById, addComment, getBarsByType } = require("../data/bars");

router.get("/", async (req, res) => {
  try {
    const bars = await getAllBars();
    res.json(bars);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const bar = await getBarById(id);
    res.json(bar);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/comment/:id", async (req, res) => {
  let id = req.params.id;
  let comment = req.body.comment;
  try {
    const bar = await addComment(id, comment);
    res.json(bar);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/type/:type", async (req, res) => {
  let type = req.params.type;
  try {
    const bars = await getBarsByType(type);
    res.json(bars);
  }
  catch(e){
    res.status(500).send(e);
  }
});
module.exports = router;
