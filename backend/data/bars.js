const { bars } = require("../config/mongoCollections");
const connection = require("../config/mongoConnection");
const ObjectId = require("mongodb").ObjectId;

const getAllBars = async () => {
  const barsCollection = await bars();
  const allBars = await barsCollection.find({}).toArray();

  return allBars;
};

const getBarById = async (id) => {
  if (!id) throw "Must enter id";
  if (id.trim().length == 0) throw "Must enter id";
  let newId = ObjectId(id);
  if (!ObjectId.isValid(newId)) throw "Must enter valid ObjectId";

  const barsCollection = await bars();
  let bar = null;
  try {
    bar = await barsCollection.findOne({ _id: newId });
  } catch (e) {
    throw e;
  }

  if (bar == null) throw `No bar available with id ${id}`;

  return bar;
};

module.exports = {
  getAllBars,
  getBarById,
};
