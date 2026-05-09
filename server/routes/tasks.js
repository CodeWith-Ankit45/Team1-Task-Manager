const express = require('express');
const Task = require('../models/Task');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Create Task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, project, assignedTo, status, priority, dueDate } = req.body;
    const task = new Task({
      title,
      description,
      project,
      assignedTo,
      status,
      priority,
      dueDate
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all tasks for a project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Task Status
router.patch('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
