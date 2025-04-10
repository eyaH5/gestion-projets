import React from 'react';
import ProjectForm from './components/projects/ProjectForm';
import ProjectList from './components/projects/ProjectList';
import TaskForm from './components/tasks/TaskForm';
import './App.css';

function App() {

  const testProjectId = 'LiJOxBc8si7e8Bz29eEB';

  const handleTaskAdded = () => {
    console.log('Task added!');
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project Management App</h1> 
      </header>
      <main>
        <ProjectForm />
        <ProjectList /> 
        <TaskForm projectId={testProjectId} onTaskAdded={handleTaskAdded} />
      </main>
    </div>
  );
}

export default App;