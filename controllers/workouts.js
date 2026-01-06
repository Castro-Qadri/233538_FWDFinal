const Workout = require('../models/Workout');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all workouts
// @route   GET /api/workouts
// @access  Public
exports.getAllWorkouts = asyncHandler(async (req, res, next) => {
  // Fetch all workouts, sorted by date (newest first)
  const workouts = await Workout.find().sort({ date: -1 });

  res.status(200).json({
    success: true,
    count: workouts.length,
    data: workouts
  });
});

// @desc    Get single workout
// @route   GET /api/workouts/:id
// @access  Public
exports.getWorkout = asyncHandler(async (req, res, next) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    return next(
      new ErrorResponse(`Workout not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: workout
  });
});

// @desc    Create new workout
// @route   POST /api/workouts
// @access  Public
exports.createWorkout = asyncHandler(async (req, res, next) => {
  const { exerciseName, duration, caloriesBurned, date } = req.body;

  // Validate required fields
  if (!exerciseName || !duration || !caloriesBurned || !date) {
    return next(
      new ErrorResponse('Please provide all required fields: exerciseName, duration, caloriesBurned, and date', 400)
    );
  }

  // Create workout with proper type conversion
  const workout = await Workout.create({
    exerciseName: exerciseName.trim(),
    duration: Number(duration),
    caloriesBurned: Number(caloriesBurned),
    date: new Date(date)
  });

  res.status(201).json({
    success: true,
    data: workout,
    message: 'Workout created successfully'
  });
});

// @desc    Update workout
// @route   PUT /api/workouts/:id
// @access  Public
exports.updateWorkout = asyncHandler(async (req, res, next) => {
  const { exerciseName, duration, caloriesBurned, date } = req.body;

  // Validate required fields
  if (!exerciseName || !duration || !caloriesBurned || !date) {
    return next(
      new ErrorResponse('Please provide all required fields: exerciseName, duration, caloriesBurned, and date', 400)
    );
  }

  let workout = await Workout.findById(req.params.id);

  if (!workout) {
    return next(
      new ErrorResponse(`Workout not found with id of ${req.params.id}`, 404)
    );
  }

  // Update workout with new data
  workout = await Workout.findByIdAndUpdate(
    req.params.id,
    {
      exerciseName,
      duration: Number(duration),
      caloriesBurned: Number(caloriesBurned),
      date: new Date(date)
    },
    {
      new: true, // Return updated document
      runValidators: true // Run schema validators
    }
  );

  res.status(200).json({
    success: true,
    data: workout,
    message: 'Workout updated successfully'
  });
});

// @desc    Delete workout
// @route   DELETE /api/workouts/:id
// @access  Public
exports.deleteWorkout = asyncHandler(async (req, res, next) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    return next(
      new ErrorResponse(`Workout not found with id of ${req.params.id}`, 404)
    );
  }

  // Delete workout
  await workout.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
    message: 'Workout deleted successfully'
  });
});

// @desc    Get workout statistics
// @route   GET /api/workouts/stats
// @access  Public
exports.getWorkoutStats = asyncHandler(async (req, res, next) => {
  const stats = await Workout.getStatistics();

  res.status(200).json({
    success: true,
    data: stats || {
      totalWorkouts: 0,
      totalDuration: 0,
      totalCalories: 0,
      avgDuration: 0,
      avgCalories: 0
    }
  });
});
