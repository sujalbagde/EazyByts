import React, { useState } from 'react';
import api from '../api/axios';

const AddProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrected this
    try {
      const response = await api.post('/api/projects/add', {
        title,
        description,
      });
      console.log('Project added:', response.data);
      setTitle('');
      setDescription('');
      alert('Project added successfully!');
    } catch (error) {
      console.error('Error adding projects:', error);
      alert('Failed to add project.');
    }
  };

  return (
    <div>
      <h2>Add new Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Corrected this
          required
        />
        <br />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <br />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProjectForm;
