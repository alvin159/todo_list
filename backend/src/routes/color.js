const express = require('express');
const router = express.Router();

let color = { backgroundColor: "#ffffff" }; // default color

router.get('/', (req, res) => {
  res.json(color);
});

router.post('/', (req, res) => {
  const { backgroundColor } = req.body;
  color.backgroundColor = backgroundColor;
  res.json(color);
});

module.exports = router;
