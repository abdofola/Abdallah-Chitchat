import * as React from "react";
import { useHistory } from "react-router-dom";
import { useThemeContext } from "../contexts/themeContext";
import { useHeight } from "../custom_hooks/useHeight";
import { auth, signOut } from "../firebase/firebase";
import { StateProps } from "../interfaces/props";
import Toggle from "./Toggle";

export default function Nav({ setNavHeight }: StateProps) {
  const [ref, getHeight] = useHeight();
  const history = useHistory();
  const theme = useThemeContext();

  React.useEffect(() => {
    setNavHeight(getHeight());
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // if (theme?.themeAlias === "dark") theme?.toggleTheme();
      history.push("/");
    } catch (error: unknown) {
      console.log("error from Chat:", error);
    }
  };

  return (
    <nav ref={ref} className={`Nav App-theme-${theme?.themeAlias}`}>
      <h1 className="Nav__logo">Fola</h1>
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
