import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create an object with all form data
    const formData = {
      email,
      password,
      // Include these conditionally if in signup mode
      ...(isSignup && {
        username,
        role,
      }),
    };

    // Log the data to console
    console.log("Form submitted with values:", formData);

    if (!isSignup) {
      setLoading(true);
      setError(null);

      try {
        // Send GET request to login endpoint
        const response = await axios.post("http://localhost:8081/user/login", {
          email: formData.email,
          password: formData.password,
        });

        setLoading(false);

        // If we get a successful response
        if (response.data && response.status === 200) {
          console.log("Login successful:", true);
          console.log("User data:", response.data);

          const safeUserData = { ...response.data };
          delete safeUserData.password;
          // Store user data in localStorage
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(safeUserData));

          window.dispatchEvent(new Event("auth-changed"));
          login(response.data);
          // Optional: Navigate to dashboard or home
          navigate("/");
        }
      } catch (err) {
        setLoading(false);
        console.log("Login successful:", false);
        console.error("Login error:", err);

        if (err.response) {
          setError(
            `Authentication failed: ${
              err.response.data.message || "Invalid credentials"
            }`
          );
        } else if (err.request) {
          setError("No response from server. Please try again later.");
        } else {
          setError(`Error: ${err.message}`);
        }
      }
    } else {
      // Handle signup
      setLoading(true);

      try {
        // Simulate successful signup
        setLoading(false);

        // Store user data (in real app, this would come from server)
        const userData = {
          id: Date.now().toString(),
          email: formData.email,
          username: formData.username,
          role: formData.role,
        };

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(userData));

        // Force a refresh of all components that use authentication state
        window.dispatchEvent(new Event("storage"));

        login(userData);
        // Navigate to home page
        navigate("/");
      } catch (error) {
        setLoading(false);
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 pt-0 pb-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {isSignup ? "Create your account" : "Sign in to your account"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            {isSignup && (
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required={isSignup}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
            )}
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            {isSignup && (
              <div>
                <div className="mt-2 flex space-x-6">
                  <div className="flex items-center">
                    <input
                      id="customer"
                      name="role"
                      type="radio"
                      checked={role === "customer"}
                      onChange={() => setRole("customer")}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="customer"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Customer
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="vendor"
                      name="role"
                      type="radio"
                      checked={role === "vendor"}
                      onChange={() => setRole("vendor")}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="vendor"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Vendor
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSignup ? "Sign up" : "Sign in"}
            </button>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-500"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
