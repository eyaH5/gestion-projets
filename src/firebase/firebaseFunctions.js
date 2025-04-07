import { db } from './firebase'; // Import the Firestore instance
import { collection, addDoc } from 'firebase/firestore';

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