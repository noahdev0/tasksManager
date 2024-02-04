// this file  contains the middleware functions which are used to handle http requests for the tasks collection in the MongoDB database

// here we will import the schema for the tasks collection

const Task = require("../models/TaskModel");
const asyncWrapper = require("../middleware/async");

const { createCustomError } = require("../errors/costume-error");
// this functions below are used to handle the http requests for the tasks collection in the MongoDB database

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = new Task(req.body);
  const result = await task.save();
  res.status(201).json({ task });

  // this will save the task to the database
  // const result = await task.save(); --------------
});

const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    const error = new Error(`Task with id ${req.params.id} is not found`);
    error.status = 404;
    return next(error);
  }
  res.json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndUpdate(taskID, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `Task with id ${taskID} is not found` });
  }
  res.json({ msg: "Task updated", task: result });
});

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).json({ msg: `Task with id ${id} is not found` });
  }
  res.status(200).json({ msg: "Task deleted" });
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
