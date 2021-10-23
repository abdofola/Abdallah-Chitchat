import React, { useState, useEffect, useContext, ReactChild } from "react";
import { auth, onAuthStateChanged } from "../firebase/firebase";
import { User } from "../interfaces/User";

interface AuthProps {
  children: ReactChild;
}

const AuthContext = React.createContext<User | null>(null);
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: AuthProps) {
  const [user, setUser] = useState<User | null>(null);

  // side effect to set the user and pass it in the context value.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // console.log("user:", user);
        return user;
      }
      console.log("user is not logged in !");
    });
  }, [user]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export { AuthProvider as default, useAuth };
