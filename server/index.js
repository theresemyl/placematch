if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const restaurantRoutes = require("./routes/restaurantRoutes");
// const userRoutes = require("./routes/userRoutes");
// const knex = require("knex")(require("./knexfile").development);
// const port = process.env.PORT || 8080;
// if (process.env.NODE_ENV !== "production") require("dotenv").config();

// const morgan = require("morgan");

// //middleware functions
// app.use(cors());
// // app.use(express.static("public"));
// app.use(express.json());

// app.use("/restaurants", restaurantRoutes);
// app.use("/users", userRoutes);

// app.listen(port, function () {
//   console.log(`Server is running on port ${port}`);
// });
