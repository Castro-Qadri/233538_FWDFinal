const express = require('express');
const router = express.Router();
const {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkoutStats
} = require('../controllers/workouts');

// Statistics route (must be before /:id route)
router.get('/stats', getWorkoutStats);

// Routes for /api/workouts
router.route('/')
  .get(getAllWorkouts)      // GET all workouts
  .post(createWorkout);     // POST create new workout

// Routes for /api/workouts/:id
router.route('/:id')
  .get(getWorkout)          // GET single workout
  .put(updateWorkout)       // PUT update workout
  .delete(deleteWorkout);   // DELETE workout

module.exports = router;
