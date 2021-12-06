if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = 8080;

const { createProxyMiddleware } = require("http-proxy-middleware");
const axios = require("axios");

// app.use(cors());
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

// const userProxy = createProxyMiddleware("/api/users/", {
//   target: "http://localhost:8080",
//   changeOrigin: true,
//   // onProxyReq: userRoutes,
// });
// app.use(
//   createProxyMiddleware("/api/users/*", {
//     target: "http://localhost:8080",
//     changeOrigin: true,
//   })
// );

app.use("/api/users", userRoutes);
// app.use(
//   createProxyMiddleware("/places", {
//     target: "https://maps.googleapis.com/maps/api/place/nearbysearch",
//     changeOrigin: true,
//     pathRewrite: {
//       [`https://maps.googleapis.com/maps/api/place/nearbysearch`]:
//         "http://localhost:8080",
//     },
//   })
// );

app.use("/api/restaurants", restaurantRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
