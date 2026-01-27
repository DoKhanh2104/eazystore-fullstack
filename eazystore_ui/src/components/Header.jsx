import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTags,
  faMoon,
  faSun,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalQuantity } from "../store/cart-slice";
import { logout, selectIsAuthenticated, selectUser } from "../store/auth-slice";

export default function Header() {
  const navLinkClass =
    "text-center text-base font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter";
  const dropdownLinkClass =
    "block w-full text-left px-4 py-2 text-base font-primary font-semibold text-primary dark:text-light hover:bg-gray-100 dark:hover:bg-gray-600";

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef();

  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };
  const toggleAdminMenu = () => {
    setIsAdminMenuOpen((prev) => !prev);
  };

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  const totalQuantity = useSelector(selectTotalQuantity);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsAdminMenuOpen(false);
    setIsUserMenuOpen(false);

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsAdminMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [theme, location.pathname]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/home");
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
              {isAuthenticated ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="relative text-primary"
                  >
                    <span className={navLinkClass}>
                      Hello!{" "}
                      {user.name.length > 5
                        ? `${user.name.slice(0, 5)}...`
                        : user.name}
                    </span>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="text-primary dark:text-light w-6 h-6"
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 w-48 bg-normalbg dark:bg-darkbg border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20 transition ease-in-out duration-200">
                      <ul className="py-2">
                        <li>
                          <Link to="/profile" className={dropdownLinkClass}>
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link to="/orders" className={dropdownLinkClass}>
                            Orders
                          </Link>
                        </li>
                        {isAdmin && (
                          <li>
                            <button
                              onClick={toggleAdminMenu}
                              className={`${dropdownLinkClass} flex items-center justify-between`}
                            >
                              Admin
                              <FontAwesomeIcon icon={faAngleDown} />
                            </button>
                            {isAdminMenuOpen && (
                              <ul className="ml-4 mt-2 space-y-2">
                                <li>
                                  <Link
                                    to="/admin/orders"
                                    className={dropdownLinkClass}
                                  >
                                    Orders
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/admin/messages"
                                    className={dropdownLinkClass}
                                  >
                                    Messages
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </li>
                        )}

                        <li>
                          <Link
                            onClick={handleLogout}
                            className={dropdownLinkClass}
                            to="/home"
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
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
              )}
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
