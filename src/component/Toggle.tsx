import { useThemeContext } from "../features/contexts/themeContext";
export default function Toggle() {
  const theme = useThemeContext();

  return (
    <label className="switch">
      <input type="checkbox" className={`${theme?.themeAlias}`} onChange={theme?.toggleTheme} />
      <span className="switch__slider" />
    </label>
  );
}
