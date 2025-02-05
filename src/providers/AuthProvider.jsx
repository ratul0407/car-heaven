import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // google provider
  const googleProvider = new GoogleAuthProvider();

  //sign in user with email and password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //sign in with google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //create new user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //log out user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //update user profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser, user);
      if (currentUser?.email) {
        const user = { email: currentUser.email };

        axios
          .post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { user },
            { withCredentials: true },
          )
          .then((res) => {
            setLoading(false);
          });
      } else {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/logout`,
            {},
            { withCredentials: true },
          )
          .then((res) => {
            setLoading(false);
          });
      }
    });
    return () => unsubscribe();
  }, []);
  console.log(user);
  const authInfo = {
    createUser,
    signInWithGoogle,
    user,
    loading,
    logOut,
    updateUserProfile,
    signInUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
