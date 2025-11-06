const { tasks } = require("../models/mockDB");

exports.getItems = (req, res) => {
  const userTasks = tasks.filter((t) => t.userId === req.userId);
  res.json(userTasks);
};

exports.createItem = (req, res) => {
  const { title } = req.body;
  const newTask = { id: tasks.length + 1, title, userId: req.userId };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const task = tasks.find((t) => t.id == id && t.userId === req.userId);
  if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });
  task.title = title;
  res.json(task);
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id == id && t.userId === req.userId);
  if (index === -1)
    return res.status(404).json({ message: "Tarefa não encontrada" });
  tasks.splice(index, 1);
  res.json({ message: "Tarefa removida" });
};
