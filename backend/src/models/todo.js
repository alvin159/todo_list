const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  tags: { type: [String], required: true },
  status: { type: String, default: "undone" },
  color: { type: String, default: "red" },
  date: { type: Date, default: Date.now },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
