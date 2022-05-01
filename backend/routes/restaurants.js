const express = require("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectID;
const {
  getAllRestaurants,
  getRestaurantById,
  addComment,
  getRestaurantsByType,
  getAllRestaurantTypes,
} = require("../data/restaurants");

router.get("/types", async (req, res) => {
  try {
    const types = await getAllRestaurantTypes();
    res.json(types);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const restaurants = await getAllRestaurants();
    res.json(restaurants);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const restaurant = await getRestaurantById(id);
    res.json(restaurant);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/comment/:id", async (req, res) => {
  let id = req.params.id;
  let comment = req.body.comment;
  try {
    const rest = await addComment(id, comment);
    res.json(rest);
  } catch (e) {
    res.status(500).send(e);
    console.log(e);
  }
});

router.post("/type/:type", async (req, res) => {
  let type = req.params.type;
  try {
    const restaurants = await getRestaurantsByType(type);
    res.json(restaurants);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
