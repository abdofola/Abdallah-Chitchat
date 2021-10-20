import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { auth, onAuthStateChanged } from "../firebase/firebase";
import { User } from "../interfaces/User";

const AuthContext = React.createContext<User | null>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const history = useHistory();

  // side effect to set the user and pass it in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        return user;
      }
      console.log("user is not logged in !");
    });
  }, [user, history]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
