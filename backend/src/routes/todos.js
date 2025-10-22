const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Get all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find().sort({ order: 1 });
  res.json(todos);
});

// Create todo
router.post('/', async (req, res) => {
  let { title, tags, status, date } = req.body;
  // convert comma-separated string to array
  if (typeof tags === 'string') {
    tags = tags.split(',').map(t => t.trim()).filter(Boolean);
  }

  const todo = new Todo({ title, tags, status, date });
  await todo.save();
  res.json(todo);
});

// Update todo
router.patch('/:id', async (req, res) => {
  let updateData = req.body;
  if (typeof updateData.tags === 'string') {
    updateData.tags = updateData.tags.split(',').map(t => t.trim()).filter(Boolean);
  }

  const todo = await Todo.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(todo);
});

// Delete todo
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Reorder todos
router.post('/reorder', async (req, res) => {
  const { reordered } = req.body; // array of todo IDs in new order
  if (!Array.isArray(reordered)) return res.status(400).json({ message: "Invalid data" });

  // Update each todo’s order field
  await Promise.all(
    reordered.map((id, index) =>
      Todo.findByIdAndUpdate(id, { order: index })
    )
  );

  res.json({ message: "Order updated" });
});

module.exports = router;
