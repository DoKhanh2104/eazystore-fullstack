import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTags,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "@/store/cart-context";

export default function Header() {
  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter";

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  const { totalQuantity } = useCart();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };
  return (
    <header className="border-b border-gray-300 dark:border-gray-600 sticky top-0 z-20 bg-normalbg dark:bg-darkbg">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
        <Link to="/" className={navLinkClass}>
          <FontAwesomeIcon icon={faTags} className="h-8 w-8" />
          <span className="font-bold">Eazy Stickers</span>
        </Link>
        <nav className="flex items-center py-2 z-10">
          <button
            className="flex justify-center items-center mx-3 w-8 h-8 border rounded-full border-primary dark:border-light transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Toggle theme"
            onClick={handleChangeTheme}
          >
            <FontAwesomeIcon
              className="w-4 h-4 text-primary dark:text-light"
              icon={theme === "dark" ? faMoon : faSun}
            />
          </button>
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `text-center font-primary dark:text-light hover:text-dark dark:hover:text-lighter px-4 py-2 rounded-full transition-all duration-300 text-primary font-semibold  ${
                    isActive
                      ? "bg-primary text-white shadow-lg hover:text-gray-200"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-center font-primary dark:text-light hover:text-dark dark:hover:text-lighter  px-4 py-2 rounded-full transition-all duration-300 text-primary font-semibold ${
                    isActive
                      ? "bg-primary text-white shadow-lg hover:text-gray-200"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-center font-primary dark:text-light hover:text-dark dark:hover:text-lighter  px-4 py-2 rounded-full transition-all duration-300 text-primary font-semibold ${
                    isActive
                      ? "bg-primary text-white shadow-lg hover:text-gray-200"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-center font-primary dark:text-light hover:text-dark dark:hover:text-lighter  px-4 py-2 rounded-full transition-all duration-300 text-primary font-semibold ${
                    isActive
                      ? "bg-primary text-white shadow-lg hover:text-gray-200"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className="relative text-primary dark:text-light py-2"
              >
                <FontAwesomeIcon
                  className="text-primary dark:text-light w-6"
                  icon={faShoppingBasket}
                />
                <div className="absolute -right-6 -top-2 bg-yellow-500 text-black font-semibold rounded-full px-2 py-1 leading-none">
                  {totalQuantity}
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// export default Header;
