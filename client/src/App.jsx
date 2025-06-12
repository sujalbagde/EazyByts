import './App.css';
import React from 'react';
import ProjectList from './components/ProjectList';
import AddProjectForm from './components/AddProjectForm';

function App() {
  return (
    <div>
      <h1>Portfolio CMS Frontend</h1>
      <AddProjectForm />
      <ProjectList />
    </div>
  );
}

export default App;
