import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSessionAlert, setShowSessionAlert] = useState(false); // Flag for alert
  const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider); // Opens the Google login window
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // If we had a user, and now we don't, and it wasn't a manual logout
      if (user && !currentUser) {
        setShowSessionAlert(true); // Trigger the alert
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const login = (email, password) => {
    setShowSessionAlert(false); // Reset alert on new login
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setShowSessionAlert(false); // No alert for intentional logouts
    return signOut(auth);
  };

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loginWithGoogle }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
