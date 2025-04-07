import React from 'react';
import ProjectForm from './components/projects/ProjectForm';
import './App.css'; // You can keep this if you want to use the default styles

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project Management App</h1> {/* Add a main title */}
      </header>
      <main>
        <ProjectForm /> {/* Render the ProjectForm component */}
      </main>
    </div>
  );
}

export default App;