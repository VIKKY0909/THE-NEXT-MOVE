import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts
    setError(""); // Clear any previous error

    const res = await login(username, password);

    if (res.success) {
      localStorage.setItem("token", res.token); // Save JWT token
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      setError("Invalid username or password");
    }

    setLoading(false); // Reset loading state when login completes
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`w-full text-white p-2 rounded-lg ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Logging in..." : "Login"} {/* Change text based on loading */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
