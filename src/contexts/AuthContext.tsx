import React, { useState, useEffect, useContext } from "react";
import { auth, onAuthStateChanged } from "../firebase/firebase";
import { SetStateType } from "../interfaces/props";
import { User } from "../interfaces/User";

type AuthProps = {
  children: React.ReactNode;
};
export type UserContext = {
  info: User | null;
  isAuthenticated: boolean;
  setAuthenticated: SetStateType<boolean>;
};

const AuthContext = React.createContext<UserContext | null>(null);
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: AuthProps) {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(false);

  // sideeffect that sets an authentication state observer and get user data.
  //  the observer gets called whenever user state sign-in changed
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
        setAuthenticated(true);
        console.log('%cuser is logged with info:','background:lightgreen;color:white',user)
      } else {
        setUserInfo(null)
        setAuthenticated(false);
        console.log("%cuser is not logged in !", 'background:red;color:white');
      }
      
    });
  }, [userInfo]);

  const user = { info: userInfo, isAuthenticated, setAuthenticated };

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export { AuthProvider as default, useAuth };
