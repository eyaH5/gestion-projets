import React, { useState, useEffect } from 'react';
import { addTaskToFirebase, getTasksFromFirebase, deleteTaskFromFirebase, updateTaskCompletionStatus } from '../../firebase/firebaseFunctions';
import './ProjectCard.css';

const ProjectCard = ({ project, onDelete, onTaskAdded }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [errorTasks, setErrorTasks] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoadingTasks(true);
      try {
        const tasksData = await getTasksFromFirebase(project.id);
        setTasks(tasksData);
        setLoadingTasks(false);
      } catch (error) {
        setErrorTasks(error.message);
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, [project.id]); 

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete project "${project.name}"?`)) {
      onDelete(project.id);
    }
  };

  const handleAddTaskClick = () => {
    setIsAddingTask(true);
  };

  const handleAddTaskSubmit = async (e) => {
    e.preventDefault();
    if (taskDescription.trim()) {
      try {
        await addTaskToFirebase(project.id, { description: taskDescription });
        setTaskDescription('');
        setIsAddingTask(false);
        const updatedTasks = await getTasksFromFirebase(project.id);
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error adding task:', error);
        alert('Failed to add task.');
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskFromFirebase(project.id, taskId);
     
      setTasks(tasks.filter(task => task.id !== taskId));
      
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  };



  const handleTaskCompletionChange = async (taskId, isChecked) => {
    try {
      await updateTaskCompletionStatus(project.id, taskId, isChecked);
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: isChecked } : task
      ));
    } catch (error) {
      console.error('Error updating task completion status:', error);
      alert('Failed to update task status.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{project.name}</h3>
        <button onClick={handleDelete}>Delete</button>
      </div>

      {!isAddingTask ? (
        <button onClick={handleAddTaskClick}>Add Task</button>
      ) : (
        <form onSubmit={handleAddTaskSubmit} style={{ marginTop: '10px' }}>
          <label>
            Task Description:
            <input
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Task description"
            />
          </label>
          <button type="submit">Add</button>
          <button type="button" onClick={() => setIsAddingTask(false)}>Cancel</button>
        </form>
      )}

<div style={{ marginTop: '15px' }}>
        <h4>Tasks:</h4>
        {loadingTasks && <p>Loading tasks...</p>}
        {errorTasks && <p>Error loading tasks: {errorTasks}</p>}
        {tasks.length > 0 ? (
          <ul>
            {tasks.map(task => (
              <li
                key={task.id}
                className={`task-item ${task.isCompleted ? 'completed-task' : ''}`} 
              >
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.isCompleted || false}
                    onChange={(e) => handleTaskCompletionChange(task.id, e.target.checked)}
                    className="task-checkbox" 
                  />
                  <span>{task.description}</span>
                </label>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;