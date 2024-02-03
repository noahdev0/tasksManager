// this file is the entry point of the application which is used to handle the backend server and the routes
const express = require("express");
const app = express();
const tasks = require("../routes/tasks");
const connectDB = require("../db/connect");
require("dotenv").config();

// parse to json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1/tasks", tasks);
const PORT = 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start(PORT);
