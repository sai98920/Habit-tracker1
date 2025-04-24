const express = require('express');
const Habit = require('../models/Habit');
const verify = require('../middleware/authMiddleware');

const router = express.Router();

// Create a habit
router.post('/habits',verify, async (req, res) => {
  const { name, description, targetDays } = req.body;
  try {
    const habit = new Habit({ name, description, targetDays, progress: [] });
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all habits
router.get('/habits',verify, async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get a habit by ID
router.get('/habits/:id',verify, async (req, res) => {
    const habitId = req.params.id;
    try {
      // Find the habit by its _id
      const habit = await Habit.findById(habitId);
  
      // If habit is not found
      if (!habit) {
        return res.status(404).json({ error: 'Habit not found' });
      }
  
      // Return the habit details
      res.json(habit);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  
  

// Mark a habit as completed on a given date
router.put('/habits/:id/complete',verify,  async (req, res) => {
  const habitId = req.params.id;
  try {
    const habit = await Habit.findByIdAndUpdate(habitId, { $push: { progress: new Date() } }, { new: true });
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete a habit
router.delete('/habits/:id',verify, async (req, res) => {
  const habitId = req.params.id;
  try {
    const habit = await Habit.findByIdAndDelete(habitId);
    res.json(habit);
    console.log(`Habit with ID ${habitId} deleted successfully.`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
