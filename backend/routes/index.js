const restaurantRoutes = require("./restaurants");
const barsRoutes = require("./bars");

const constructorMethod = (app) => {
  app.use("/restaurants", restaurantRoutes);
  app.use("/bars", barsRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
