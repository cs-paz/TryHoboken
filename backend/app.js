const express = require("express");
const cors = require("cors");
const env = require("./env");
const app = express();
const configRoutes = require("./routes");
const port = 3001;

const corsOptions = {
  // all network requests allowed from the frontend URL only
  origin: env?.frontendUrl,
};

app.use(cors(corsOptions));

app.use(express.json());

configRoutes(app);

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
