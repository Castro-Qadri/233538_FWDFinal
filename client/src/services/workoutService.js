import axios from 'axios';

const API_URL = '/api/workouts';

// Get all workouts
export const getAllWorkouts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; // Extract data array from response
  } catch (error) {
    throw error.response?.data?.error || 'Error fetching workouts';
  }
};

// Get single workout by ID
export const getWorkoutById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error fetching workout';
  }
};

// Create new workout
export const createWorkout = async (workoutData) => {
  try {
    const response = await axios.post(API_URL, workoutData);
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error creating workout';
  }
};

// Update workout
export const updateWorkout = async (id, workoutData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, workoutData);
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error updating workout';
  }
};

// Delete workout
export const deleteWorkout = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error deleting workout';
  }
};
