import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7243/api',
});

// Shopping List APIs
export const getShoppingItems = () => api.get('/shoppingitem');
export const createShoppingItem = (item) => api.post('/shoppingitem', item);
export const updateShoppingItem = (id, item) => api.put(`/shoppingitem/${id}`, item);
export const deleteShoppingItem = (id) => api.delete(`/shoppingitem/${id}`);

// Chores APIs
export const getChores = () => api.get('/chore');
export const createChore = (chore) => api.post('/chore', chore);
export const updateChore = (id, chore) => api.put(`/chore/${id}`, chore);
export const deleteChore = (id) => api.delete(`/chore/${id}`);

// User Management APIs
export const getUsers = () => api.get('/users');
export const createUser = (user) => api.post('/users', user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Usernames API
export const getUsernames = () => api.get('/users/usernames');

// Authentication APIs
export const registerUser = (user) => api.post('/users/register', user);
export const loginUser = (credentials) => api.post('/users/login', credentials);

// Dinner Poll APIs 
export const getDinnerPolls = () => api.get('/dinnerpoll');
export const createDinnerPoll = (dinnerPoll) => api.post('/dinnerpoll', dinnerPoll);
export const voteDinnerPoll = (id, vote) => api.post(`/dinnerpoll/${id}/vote`, vote);
export const deleteDinnerPoll = (id) => api.delete(`/dinnerpoll/${id}`);

// Calendar Events APIs
export const getCalendarEvents = () => api.get('/calendarevent');
export const createCalendarEvent = (event) => api.post('/calendarevent', event); 
export const deleteCalendarEvent = (id) => api.delete(`/calendarevent/${id}`);

// Contributions APIs
export const getContributions = () => api.get('/contribution');
export const createContribution = (contribution) => api.post('/contribution', contribution);
export const deleteContribution = (id) => api.delete(`/contribution/${id}`);

export default api;