import React, { useState, useEffect } from 'react';
import './WorkoutForm.css';

const WorkoutForm = ({ onSubmit, editingWorkout, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    exerciseName: '',
    duration: '',
    caloriesBurned: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingWorkout) {
      setFormData({
        exerciseName: editingWorkout.exerciseName,
        duration: editingWorkout.duration,
        caloriesBurned: editingWorkout.caloriesBurned,
        date: editingWorkout.date ? new Date(editingWorkout.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
    }
  }, [editingWorkout]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.exerciseName.trim()) {
      newErrors.exerciseName = 'Exercise name is required';
    } else if (formData.exerciseName.trim().length < 2) {
      newErrors.exerciseName = 'Exercise name must be at least 2 characters';
    }

    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
    } else if (formData.duration <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    } else if (formData.duration > 1440) {
      newErrors.duration = 'Duration cannot exceed 1440 minutes (24 hours)';
    }

    if (!formData.caloriesBurned) {
      newErrors.caloriesBurned = 'Calories burned is required';
    } else if (formData.caloriesBurned <= 0) {
      newErrors.caloriesBurned = 'Calories must be greater than 0';
    } else if (formData.caloriesBurned > 10000) {
      newErrors.caloriesBurned = 'Calories seems too high';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      
      // Reset form after successful submission (only if not editing)
      if (!editingWorkout) {
        setFormData({
          exerciseName: '',
          duration: '',
          caloriesBurned: '',
          date: new Date().toISOString().split('T')[0]
        });
      }
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setFormData({
      exerciseName: '',
      duration: '',
      caloriesBurned: '',
      date: new Date().toISOString().split('T')[0]
    });
    setErrors({});
    onCancelEdit();
  };

  return (
    <div className="workout-form-container">
      <h2 className="form-title">
        {editingWorkout ? ' Update Workout' : ' Log New Workout'}
      </h2>
      
      <form onSubmit={handleSubmit} className="workout-form" noValidate>
        <div className="form-group">
          <label htmlFor="exerciseName">
            Exercise Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="exerciseName"
            name="exerciseName"
            value={formData.exerciseName}
            onChange={handleChange}
            placeholder="e.g., Running, Push-ups, Yoga"
            className={errors.exerciseName ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.exerciseName && (
            <span className="error-message">{errors.exerciseName}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration">
              Duration (minutes) <span className="required">*</span>
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="30"
              min="1"
              max="1440"
              className={errors.duration ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.duration && (
              <span className="error-message">{errors.duration}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="caloriesBurned">
              Calories Burned <span className="required">*</span>
            </label>
            <input
              type="number"
              id="caloriesBurned"
              name="caloriesBurned"
              value={formData.caloriesBurned}
              onChange={handleChange}
              placeholder="200"
              min="1"
              max="10000"
              className={errors.caloriesBurned ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.caloriesBurned && (
              <span className="error-message">{errors.caloriesBurned}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="date">
            Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            className={errors.date ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.date && (
            <span className="error-message">{errors.date}</span>
          )}
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (editingWorkout ? 'Update Workout' : 'Add Workout')}
          </button>
          
          {editingWorkout && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;
