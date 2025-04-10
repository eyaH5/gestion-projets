import React, { useState } from 'react';
import { addTaskToFirebase } from '../../firebase/firebaseFunctions';


const TaskForm = ({ projectId, onTaskAdded }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() && projectId) {
        try {
          const newTask = { description }; 
          setDescription(''); 
          if (onTaskAdded) {
            onTaskAdded();  
          }
        } catch (error) {
          console.error('Failed to add task:', error);
          alert('Failed to add task.'); 
        }
      } else if (!projectId) {
        alert('Error: No project selected.');
      }
    };

  return (
    <div>
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
          />
        </label>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;