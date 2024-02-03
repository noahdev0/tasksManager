// this file  contains the middleware functions which are used to handle http requests for the tasks collection in the MongoDB database

// here we will import the schema for the tasks collection

const Task = require("../models/TaskModel");

// this functions below are used to handle the http requests for the tasks collection in the MongoDB database
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json({ tasks });
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const result = await task.save();
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }

  // this will save the task to the database
  // const result = await task.save(); --------------
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `Task with id ${req.params.id} is not found` });
    }
    res.json({ task });
  } catch (e) {
    res.status(404).json({ msg: `Task with id ${req.params.id} is not found` });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndUpdate(taskID, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `Task with id ${taskID} is not found` });
    }
    res.json({ msg: "Task updated", task: result });
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).json({ msg: `Task with id ${id} is not found` });
  }
  res.status(200).json({ msg: "Task deleted" });
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
