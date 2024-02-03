const getAllTasks = (req, res) => {
  res.send("All items from the tasks collection");
};

const createTask = (req, res) => {
  res.json(req.body);
};

const getTask = (req, res) => {
  result = {
    params: req.params,
    msg: "Get Task by ID",
  };
  res.json(result);
};

const updateTask = (req, res) => {
  result = {
    params: req.params,
    msg: "Updated",
  };
  res.json(result);
};

const deleteTask = (req, res) => {
  result = {
    params: req.params,
    msg: "deleted",
  };
  res.json(result);
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
