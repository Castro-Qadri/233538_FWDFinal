const mongoose = require('mongoose');

// Define Workout Schema
const WorkoutSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true,
    minlength: [2, 'Exercise name must be at least 2 characters long'],
    maxlength: [100, 'Exercise name cannot exceed 100 characters']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 minute'],
    max: [1440, 'Duration cannot exceed 1440 minutes (24 hours)']
  },
  caloriesBurned: {
    type: Number,
    required: [true, 'Calories burned is required'],
    min: [1, 'Calories burned must be at least 1'],
    max: [10000, 'Calories burned cannot exceed 10000']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    validate: {
      validator: function(value) {
        // Don't allow future dates
        return value <= new Date();
      },
      message: 'Date cannot be in the future'
    }
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create indexes for better query performance
WorkoutSchema.index({ date: -1 }); // Sort by date descending
WorkoutSchema.index({ exerciseName: 1 }); // Search by exercise name

// Instance method to format workout data
WorkoutSchema.methods.toJSON = function() {
  const workout = this.toObject();
  return workout;
};

// Static method to get workout statistics
WorkoutSchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalWorkouts: { $sum: 1 },
        totalDuration: { $sum: '$duration' },
        totalCalories: { $sum: '$caloriesBurned' },
        avgDuration: { $avg: '$duration' },
        avgCalories: { $avg: '$caloriesBurned' }
      }
    }
  ]);
  
  return stats.length > 0 ? stats[0] : null;
};

// Create and export the Workout model
const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
