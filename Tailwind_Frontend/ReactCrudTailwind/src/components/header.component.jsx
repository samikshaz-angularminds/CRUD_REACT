import { useThemeContext } from "../contexts/ThemeContext";
import { removeToken } from "../services/token.service";
import { useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

function Header() {
  const { theme, setTheme } = useThemeContext();
  const navigate = useNavigate();

  const toggleTheme = (theme) => {
    console.log("theme is: ", theme);

    if (theme === "light") setTheme("dark");
    if (theme === "dark") setTheme("light");
  };

  const logout = () => {
    removeToken();
    navigate("/", { replace: true });
  };

  return (
    <header className="bg-amber-600 dark:bg-amber-200 flex justify-around p-3 items-center">
      <div>
        <button
          className="bg-gray-950 text-amber-50 dark:bg-amber-50 dark:text-gray-950 p-2 rounded-lg hover:cursor-pointer"
          onClick={() => toggleTheme(theme)}
        >
          {theme === "light" ? <MdDarkMode /> : <CiLight />}
        </button>
      </div>

      <div>
        <button
          className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-amber-50 p-2.5 rounded-lg "
          onClick={logout}
        >
          LogOut
        </button>
      </div>
    </header>
  );
}

export default Header;
