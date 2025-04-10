import { db } from './firebase'; // Import the Firestore instance
import { collection, addDoc,getDocs, deleteDoc,doc, updateDoc } from 'firebase/firestore';

export const addProjectToFirebase = async (projectData) => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), projectData);
    console.log('Project added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding project: ', error);
    throw error;
  }
};

export const getProjectsFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return projects;
  } catch (error) {
    console.error('Error fetching projects: ', error);
    throw error;
  }
};



export const deleteProjectFromFirebase = async (projectId) => {
  try {
    await deleteDoc(doc(db, 'projects', projectId));
    console.log('Project deleted with ID: ', projectId);
  } catch (error) {
    console.error('Error deleting project: ', error);
  }
};

export const addTaskToFirebase = async (projectId, taskData) => {
  try {
    const tasksCollectionRef = collection(db, 'projects', projectId, 'tasks');
    const docRef = await addDoc(tasksCollectionRef, taskData);
    console.log(`Task added to project ${projectId} with ID: `, docRef.id);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding task to project ${projectId}: `, error);
    throw error;
  }
};

export const getTasksFromFirebase = async (projectId) => {
  try {
    const tasksCollectionRef = collection(db, 'projects', projectId, 'tasks');
    const querySnapshot = await getDocs(tasksCollectionRef);
    const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return tasks;
  } catch (error) {
    console.error(`Error fetching tasks for project ${projectId}: `, error);
    throw error;
  }
};
export const deleteTaskFromFirebase = async (projectId, taskId) => {
  try {
    await deleteDoc(doc(db, 'projects', projectId, 'tasks', taskId));
    console.log(`Task ${taskId} deleted from project ${projectId}`);
  } catch (error) {
    console.error(`Error deleting task ${taskId} from project ${projectId}: `, error);
  }
};

export const updateTaskCompletionStatus = async (projectId, taskId, isCompleted) => {
  try {
    const taskDocRef = doc(db, 'projects', projectId, 'tasks', taskId); 
    await updateDoc(taskDocRef, { isCompleted: isCompleted }); 
    console.log(`Task ${taskId} in project ${projectId} updated to completed: ${isCompleted}`);
  } catch (error) {
    console.error(`Error updating task ${taskId} in project ${projectId}: `, error);
  }
};
