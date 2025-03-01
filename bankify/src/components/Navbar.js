import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLandmark,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to check auth status
  const checkAuthStatus = () => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");

    setIsAuthenticated(authStatus === "true");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  useEffect(() => {
    // Check authentication status when component mounts
    checkAuthStatus();
    // Add storage event listener to detect changes from other tabs/components
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    window.addEventListener("storage", handleStorageChange);
    // Clean up
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");

    window.dispatchEvent(new Event("storage"));
  };
  return (
    <div>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="rounded-full bg-gradient-to-br from-blue-100 to-white p-2 transform transition-transform duration-200 group-hover:scale-110">
              <FontAwesomeIcon
                icon={faLandmark}
                className="text-blue-500 text-2xl"
              />
            </div>
            <h1 className="text-white text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Bankify
            </h1>
          </div>
          <div className="flex space-x-8">
            <a
              href="/services"
              className="text-white hover:text-blue-200 text-lg"
            >
              Services
            </a>
            <a
              href="/accounts"
              className="text-white hover:text-blue-200 text-lg"
            >
              Accounts
            </a>
            <a href="/loans" className="text-white hover:text-blue-200 text-lg">
              Loans & Credit
            </a>
            <a
              href="/wealth"
              className="text-white hover:text-blue-200 text-lg"
            >
              Wealth Management
            </a>
            <a
              href="/digital"
              className="text-white hover:text-blue-200 text-lg"
            >
              Digital Banking
            </a>
            <a
              href="/payments"
              className="text-white hover:text-blue-200 text-lg"
            >
              Payments & Transfers
            </a>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-white">
                  {user?.username || user?.email || "User"}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-white text-blue-500 px-4 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 bg-white text-blue-500 px-4 py-1 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <FontAwesomeIcon icon={faUser} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
