const { restaurants } = require("../config/mongoCollections");
const connection = require("../config/mongoConnection");
const ObjectID = require("mongodb").ObjectID;

const getAllRestaurants = async () => {
  const restaurantsCollection = await restaurants();
  const allRestaurants = await restaurantsCollection.find({}).toArray();

  return allRestaurants;
};

module.exports = {
  getAllRestaurants,
};
