import React, { useState } from 'react';
import './WorkoutList.css';

const WorkoutList = ({ workouts, onEdit, onDelete, loading }) => {
  const [deletingId, setDeletingId] = useState(null);

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle delete with confirmation
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } catch (error) {
        console.error('Error deleting workout:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Calculate total statistics
  const calculateStats = () => {
    if (!workouts || workouts.length === 0) return null;

    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);
    const totalCalories = workouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0);
    const avgDuration = Math.round(totalDuration / totalWorkouts);
    const avgCalories = Math.round(totalCalories / totalWorkouts);

    return {
      totalWorkouts,
      totalDuration,
      totalCalories,
      avgDuration,
      avgCalories
    };
  };

  const stats = calculateStats();

  // Loading state
  if (loading) {
    return (
      <div className="workout-list-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading workouts...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!workouts || workouts.length === 0) {
    return (
      <div className="workout-list-container">
        <div className="empty-state">
          <div className="empty-icon"></div>
          <h3>No Workouts Yet</h3>
          <p>Start tracking your fitness journey by logging your first workout!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="workout-list-container">
      <div className="list-header">
        <h2 className="list-title">  Workout History</h2>
        <span className="workout-count">{workouts.length} workout{workouts.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <span className="stat-label">Total Workouts</span>
              <span className="stat-value">{stats.totalWorkouts}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <span className="stat-label">Total Duration</span>
              <span className="stat-value">{stats.totalDuration} min</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <span className="stat-label">Total Calories</span>
              <span className="stat-value">{stats.totalCalories} cal</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <span className="stat-label">Avg per Workout</span>
              <span className="stat-value">{stats.avgDuration} min / {stats.avgCalories} cal</span>
            </div>
          </div>
        </div>
      )}

      {/* Workout Cards */}
      <div className="workout-grid">
        {workouts.map((workout) => (
          <div key={workout._id} className="workout-card">
            <div className="workout-card-header">
              <h3 className="workout-name">{workout.exerciseName}</h3>
              <span className="workout-date">{formatDate(workout.date)}</span>
            </div>

            <div className="workout-details">
              <div className="detail-item">
                <span className="detail-icon">⏱</span>
                <div className="detail-content">
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">{workout.duration} min</span>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon"></span>
                <div className="detail-content">
                  <span className="detail-label">Calories</span>
                  <span className="detail-value">{workout.caloriesBurned} cal</span>
                </div>
              </div>
            </div>

            <div className="workout-actions">
              <button
                className="action-btn edit-btn"
                onClick={() => onEdit(workout)}
                disabled={deletingId === workout._id}
                title="Update Progress"
              >
                <span className="btn-icon"></span>
                <span className="btn-text">Update</span>
              </button>
              <button
                className="action-btn delete-btn"
                onClick={() => handleDelete(workout._id)}
                disabled={deletingId === workout._id}
                title="Delete Workout"
              >
                <span className="btn-icon"></span>
                <span className="btn-text">
                  {deletingId === workout._id ? 'Deleting...' : 'Delete'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;
