import React, { useState, useEffect, useContext } from "react";
import { auth, onAuthStateChanged } from "../firebase/firebase";
import { User } from "../interfaces/User";

type AuthProps = {
  children: React.ReactNode;
};
export type UserContext = {
  info: User | null;
  isAuthenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = React.createContext<UserContext | null>(null);
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: AuthProps) {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(false);

  // side effect to set the user and pass it in the context value.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
        setAuthenticated(true);
        return user;
      }
      console.log("user is not logged in !");
    });
  }, [userInfo]);

  const user = { info: userInfo, isAuthenticated, setAuthenticated };

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export { AuthProvider as default, useAuth };
