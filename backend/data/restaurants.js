const { restaurants } = require("../config/mongoCollections");
const connection = require("../config/mongoConnection");
const ObjectId = require("mongodb").ObjectId;

const getAllRestaurants = async () => {
  const restaurantsCollection = await restaurants();
  const allRestaurants = await restaurantsCollection.find({}).toArray();

  return allRestaurants;
};

const getRestaurantById = async (id) => {
  if (!id) throw "Must enter id";
  if (id.trim().length == 0) throw "Must enter id";
  let newId = ObjectId(id);
  if (!ObjectId.isValid(newId)) throw "Must enter valid ObjectId";

  const restaurantsCollection = await restaurants();
  let restaurant = null;
  try {
    restaurant = await restaurantsCollection.findOne({ _id: newId });
  } catch (e) {
    throw e;
  }

  if (restaurant == null) throw `No restaurant available with id ${id}`;

  return restaurant;
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
};
