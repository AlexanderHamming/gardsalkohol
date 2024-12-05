import { createContext, useState, useEffect, PropsWithChildren } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { LoginAndSignupType } from "@/types/users";

interface AuthContextType {
  signup: (data: LoginAndSignupType) => Promise<void>;
  login: (data: LoginAndSignupType ) => Promise<void>;
  logout: () => Promise<void>;
  currentUser: User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async ({ email, password }: LoginAndSignupType) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };


  const login = async ({ email, password }: LoginAndSignupType) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    signup,
    login,
    logout,
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};



