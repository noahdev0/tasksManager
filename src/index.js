// this file is the entry point of the application which is used to handle the backend server and the routes
const express = require("express");
const app = express();
const notfound = require("../middleware/not-found");
const erroHandler = require("../middleware/error-handler");
const tasks = require("../routes/tasks");
const connectDB = require("../db/connect");
//the code above is used to import the required packages and files

require("dotenv").config(); //for using the environment variables .env file

// parse to json
app.use(express.json());
app.use(express.static("./public")); // to serve the static files <html, css, js, images, ...>

// routes
app.use("/api/v1/tasks", tasks);

app.use(notfound); // 404 || will handle the not found routes
app.use(erroHandler); // 500 || will handle the errors that accure in the application

const PORT = 3000; // the port that the server will listen to
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
start(PORT); // start the server if the connection to the database is successful
