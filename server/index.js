require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const restaurantRoutes = require("./routes/restaurantRoutes");
const port = process.env.PORT || 8080;

//middleware functions
app.use(cors());
// app.use(express.static("public"));
app.use(express.json());

app.use("/restaurants", restaurantRoutes);

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
