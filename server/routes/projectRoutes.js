import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// GET
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST
router.post('/add', async (req, res) => {
  try {
    const { title, description, link } = req.body;

    if (!title || !description || !link) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProject = new Project({ title, description, link });
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, link },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE a project
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
