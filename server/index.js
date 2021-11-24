require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
// const warehouseRoutes = require("./routes/warehouseRoutes.js");
// const inventoryRoutes = require("./routes/inventoryRoutes");

const port = process.env.PORT || 8000;

//middleware functions
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

//warehouse and inventory routes (may change based on structure)
// app.use("/warehouses", warehouseRoutes);
// app.use("/inventories", inventoryRoutes);

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
