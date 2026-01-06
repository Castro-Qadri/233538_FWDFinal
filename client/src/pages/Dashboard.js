import React, { useState, useEffect } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import { 
  getAllWorkouts, 
  createWorkout, 
  updateWorkout, 
  deleteWorkout 
} from '../services/workoutService';
import './Dashboard.css';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch workouts on component mount
  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Fetch all workouts from API
  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllWorkouts();
      // Sort by date (most recent first)
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setWorkouts(sortedData);
    } catch (err) {
      setError(err.message || 'Failed to fetch workouts');
      console.error('Error fetching workouts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle create workout
  const handleCreateWorkout = async (workoutData) => {
    try {
      const newWorkout = await createWorkout(workoutData);
      setWorkouts(prev => [newWorkout, ...prev]);
      showSuccessMessage('✓ Workout added successfully!');
    } catch (err) {
      const errorMsg = err || 'Failed to create workout';
      setError(errorMsg);
      console.error('Error creating workout:', err);
      throw err;
    }
  };

  // Handle updating existing workout
  const handleUpdateWorkout = async (workoutData) => {
    if (!editingWorkout || !editingWorkout._id) {
      setError('No workout selected for editing');
      return;
    }

    try {
      const updatedWorkout = await updateWorkout(editingWorkout._id, workoutData);
      
      setWorkouts(prev => {
        const updated = prev.map(workout => 
          workout._id === editingWorkout._id ? updatedWorkout : workout
        );
        return updated.sort((a, b) => new Date(b.date) - new Date(a.date));
      });
      
      setEditingWorkout(null);
      showSuccessMessage('✓ Workout updated successfully!');
    } catch (err) {
      const errorMsg = err || 'Failed to update workout';
      setError(errorMsg);
      console.error('Error updating workout:', err);
      throw err;
    }
  };

  // Handle form submission (create or update)
  const handleSubmitWorkout = async (workoutData) => {
    if (editingWorkout) {
      await handleUpdateWorkout(workoutData);
    } else {
      await handleCreateWorkout(workoutData);
    }
  };

  // Handle edit button click
  const handleEditWorkout = (workout) => {
    setEditingWorkout(workout);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingWorkout(null);
  };

  // Handle delete workout
  const handleDeleteWorkout = async (id) => {
    try {
      await deleteWorkout(id);
      setWorkouts(prev => prev.filter(workout => workout._id !== id));
      showSuccessMessage('✓ Workout deleted successfully!');
      
      // If we were editing this workout, clear the edit state
      if (editingWorkout && editingWorkout._id === id) {
        setEditingWorkout(null);
      }
    } catch (err) {
      const errorMsg = err || 'Failed to delete workout';
      setError(errorMsg);
      console.error('Error deleting workout:', err);
      throw err;
    }
  };

  // Show success message temporarily
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Dismiss error message
  const dismissError = () => {
    setError(null);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title"> Fitness Tracker</h1>
            <p className="dashboard-subtitle">Track your workouts, monitor your progress, achieve your goals!</p>
          </div>
        </header>

        {/* Success Message */}
        {successMessage && (
          <div className="alert alert-success">
            <span>{successMessage}</span>
            <button 
              className="alert-close" 
              onClick={() => setSuccessMessage('')}
              aria-label="Close"
            >
              
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-error">
            <span>⚠️ {error}</span>
            <button 
              className="alert-close" 
              onClick={dismissError}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Workout Form */}
          <section className="form-section">
            <WorkoutForm 
              onSubmit={handleSubmitWorkout}
              editingWorkout={editingWorkout}
              onCancelEdit={handleCancelEdit}
            />
          </section>

          {/* Workout List */}
          <section className="list-section">
            <WorkoutList 
              workouts={workouts}
              onEdit={handleEditWorkout}
              onDelete={handleDeleteWorkout}
              loading={loading}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
