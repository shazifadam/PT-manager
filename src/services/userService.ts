import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User } from '../types';

export const userService = {
  // Check if user exists in Firestore
  async getUserProfile(uid: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as User;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Create new user profile
  async createUserProfile(uid: string, data: {
    displayName: string;
    email: string;
    photoURL: string;
  }): Promise<void> {
    try {
      await setDoc(doc(db, 'users', uid), {
        uid,
        displayName: data.displayName,
        email: data.email,
        photoURL: data.photoURL,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },

  // Update user profile (for first-time setup)
  async updateUserProfile(uid: string, data: Partial<User>): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', uid), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },
};
