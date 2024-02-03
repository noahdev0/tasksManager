// this file  contains the middleware functions which are used to handle http requests for the tasks collection in the MongoDB database

// here we will import the schema for the tasks collection

const Task = require("../models/TaskModel");

// this functions below are used to handle the http requests for the tasks collection in the MongoDB database
const getAllTasks = (req, res) => {
  res.send("All items from the tasks collection");
};

const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const result = await task.save();
    console.log(result);
    res.status(201).json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }

  // this will save the task to the database
  // const result = await task.save(); --------------
};

const getTask = async (req, res) => {
  result = {
    id: req.params.id,
    msg: "Get Task by ID",
  };
  res.json(result);
};

const updateTask = async (req, res) => {
  result = {
    id: req.params.id,
    msg: "Updated",
  };
  res.json(result);
};

const deleteTask = async (req, res) => {
  result = {
    id: req.params.id,
    msg: "deleted",
  };
  res.json(result);
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
