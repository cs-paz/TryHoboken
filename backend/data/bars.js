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

//This will update a bar page with a new comment and returns the bar json, should throw an error if no bars with the matching id
const addComment = async (id, comment) =>{
  if (!id){
    throw 'Must enter id';
  }
  //ids must be passed as a string for this to work, might change it later.
  if (typeof id != 'string'){
    throw 'The id must be a string';
  }
  if (id.trim().length === 0){
    throw 'The id cannot be empty spaces';
  }
  if (!comment){
    throw 'Comment must not be empty';
  }
  //Comments must be strings to be passed in, could probably be updated to change all comments to strings
  if (typeof comment != 'string'){
    throw 'Comment must be a string';
  }

  let usableId = ObjectId(id);
  if (!ObjectId.isValid(usableId)){
    throw 'Must enter valid ObjectId';
  }
  //Find bar using id, get existing comments
  const barsCollection = await bars();
  let foundBar;
  try{
    foundBar = await getBarById(id);
  }
  catch(e){
    throw e;
  }
  //add new comment to existing comments
  let newComments = foundBar.comments;
  newComments.push(comment)
  let updateInfo;
  try{
    updateInfo = await barsCollection.updateOne(
      {_id: usableId},
      {$set: {comments: newComments}});
  }
  catch(e){
    throw e;
  }

  if (updateInfo.modifiedCount === 0){
    throw `Bar with id ${id} failed to update comments.`;
  }

  //get updated bar to return
  let result;
  try{
    result = await getBarById(id);
  }
  catch(e){
    throw e;
  }
  return result;
}

//takes type as an input, returns array of matching bars, if none are found, return empty array;
const getBarsByType = async (type) => {
  if(!type){
    throw 'Must enter type';
  }
  if (typeof type != 'string'){
    throw 'Type must be a string';
  }
  if (type.trim().length == 0){
    throw 'Type cannot be only spaces';
  }
  let barCollection = await bars();
  let foundBars;
  let result = [];
  try{
    foundBars = await barCollection.find({type: type});
  }
  catch(e){
    throw e;
  }
  if (foundBars.hasNext()){
    result = foundBars.toArray();
  }
  return result;

}

module.exports = {
  getAllBars,
  getBarById,
  addComment,
  getBarsByType,
};
