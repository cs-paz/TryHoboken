const express = require("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectID;
const { getAllRestaurants, getRestaurantById } = require("../data/restaurants");

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

module.exports = router;
