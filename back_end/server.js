const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv-flow").config();

const movieRoutes = require("./routes/movieRoutes");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", movieRoutes);

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed. Server not started");
    console.log(err);
  });
