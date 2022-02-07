import * as React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../features/contexts/AuthContext";
import { useThemeContext } from "../features/contexts/themeContext";
import { useHeight } from "../features/helpers/custom_hooks/useHeight";
import { auth, signOut } from "../firebase/firebase";
import { StateProps } from "../interfaces/props";
import Toggle from "./Toggle";

export default function Nav({ setNavHeight }: StateProps<number>) {
  const [ref, getHeight] = useHeight();
  const history = useHistory();
  const theme = useThemeContext();
  const user = useAuth();
  React.useEffect(() => {
    setNavHeight(getHeight());
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      user?.setAuthenticated(false);
      history.push("/");
    } catch (error: unknown) {
      console.log("error from Chat:", error);
    }
  };

  return (
    <nav ref={ref} className={`Nav App-theme-${theme?.themeAlias}`}>
      <h1 className="Nav__logo">klam</h1>
      <Toggle />
      <button
        onClick={handleLogout}
        className={`App-theme-${theme?.themeAlias}`}
      >
        Logout
      </button>
    </nav>
  );
}
