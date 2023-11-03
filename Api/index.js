const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
    headers: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
require("dotenv").config();
const connectdb = require("./src/config/mongodb");

app.use(express.static(__dirname + "/build"));

//Routers
const taskRouter = require("./src/router/taskrouter");

const PORT = process.env.PORT || 3000;

//Basic middleware
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.use("/api/v1/task", taskRouter);

const URL_T = process.env.NODE_ENV;
connectdb()
  .then(() => {
    console.log("Db connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on ${URL_T}`);
    });
  })
  .catch((error) => {
    console.log("Db connection error", error);
  });
