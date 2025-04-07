import React, { useState } from 'react';
import { addProjectToFirebase } from '../../firebase/firebaseFunctions';

const ProjectForm = () => {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectName.trim()) {
      try {
        await addProjectToFirebase({ name: projectName });
        setProjectName('');
      } catch (error) {
        console.error('Failed to add project:', error);
        // Optionally display an error message
      }
    }
  };

  return (
    <div>
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;