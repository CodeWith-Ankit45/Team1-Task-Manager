const express = require('express');
const Project = require('../models/Project');
const { auth, isAdmin } = require('../middleware/auth');
const router = express.Router();

// Create Project (Admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const project = new Project({
      name,
      description,
      owner: req.user.id,
      members: members || []
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all projects (accessible by members of the project or admin)
router.get('/', auth, async (req, res) => {
  try {
    let projects;
    if (req.user.role === 'Admin') {
      projects = await Project.find().populate('owner', 'name email');
    } else {
      projects = await Project.find({
        $or: [{ owner: req.user.id }, { members: req.user.id }]
      }).populate('owner', 'name email');
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single project
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('owner members', 'name email');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
