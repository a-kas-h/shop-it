import { createContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Initialize Firebase
  useEffect(() => {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };

    initializeApp(firebaseConfig);
    
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Register a new user
  const register = async (email, password, displayName) => {
    setError('');
    try {
      const auth = getAuth();
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Login user
  const login = async (email, password) => {
    setError('');
    try {
      const auth = getAuth();
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout user
  const logout = async () => {
    setError('');
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    setError('');
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};