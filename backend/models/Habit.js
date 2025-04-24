const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  targetDays: { type: Number, required: true },  // Total number of days user wants to track
  progress: [{ type: Date }],  // Array of dates when the habit was completed
});

module.exports = mongoose.model('Habit', habitSchema);
