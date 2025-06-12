import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects';

//to fetch
export const getProjects = async () => {
  return await axios.get(API_URL);
};

//to add project
export const addProject = async (projectData) => {
  return await axios.post(`${API_URL}/add`, projectData);
};
