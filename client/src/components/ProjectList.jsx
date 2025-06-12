import React, { useEffect, useState } from 'react';
import api from '../api/axios';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [editProjectId, setEditProjectId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    link: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await api.delete(`/api/projects/${projectId}`);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleEditClick = (project) => {
    setEditProjectId(project._id);
    setEditFormData({
      title: project.title,
      description: project.description,
      link: project.link,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (projectId) => {
    try {
      await api.put(`/api/projects/${projectId}`, editFormData);
      fetchProjects();
      setEditProjectId(null); // close the edit form
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div>
      <h2>Project List</h2>
      {projects.map((project) => (
        <div
          key={project._id}
          style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}
        >
          {editProjectId === project._id ? (
            <div>
              <input
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleEditChange}
                placeholder="Title"
              />
              <input
                type="text"
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                placeholder="Description"
              />
              <input
                type="text"
                name="link"
                value={editFormData.link}
                onChange={handleEditChange}
                placeholder="Link"
              />
              <button onClick={() => handleEditSubmit(project._id)}>Save</button>
              <button onClick={() => setEditProjectId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <button onClick={() => handleEditClick(project)}>Edit</button>
              <button onClick={() => handleDelete(project._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
