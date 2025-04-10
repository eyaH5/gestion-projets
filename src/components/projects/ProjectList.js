import React, { useState, useEffect } from 'react';
import { getProjectsFromFirebase, deleteProjectFromFirebase } from '../../firebase/firebaseFunctions';
import ProjectCard from './ProjectCard';

const ProjectList = ({ onProjectAdded }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

        const fetchProjects = async () => {
          try {
            const projectsData = await getProjectsFromFirebase();
            setProjects(projectsData);
            setLoading(false);
          } catch (err) {
            setError(err.message);
            setLoading(false);
          }
        };

        useEffect(() => {
          fetchProjects();
        }, []); 
      
        useEffect(() => {
          if (onProjectAdded) {
            fetchProjects(); 
          }
        }, [onProjectAdded]); 
      
        const handleDeleteProject = async (projectId) => {
          try {
            await deleteProjectFromFirebase(projectId);
            fetchProjects();
          } catch (error) {
            console.error('Error deleting project: ', error);
            setError('Failed to delete project.');
          }
        };
      
    if (loading) {
      return <p>Loading projects...</p>;
    }
     
  if (error) {
    return <p>Error loading projects: {error}</p>;
  }

  return (
    <div>
      <h2>Project List</h2>
      {projects.map((project) => (
        <ProjectCard
         key={project.id} 
        project={project} 
        onDelete={handleDeleteProject}
        onTaskAdded={fetchProjects}
         />
      ))}
    </div>
  );
};

export default ProjectList; 