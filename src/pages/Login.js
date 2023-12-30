import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("kminchelle");
  const [password, setPassword] = useState("0lelplR");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const apiUrl = "https://dummyjson.com/auth/login";

      const response = await axios.post(
        apiUrl,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log(data);

        const authToken = data.token;

        // Save the token to state

        // Save the token to localStorage
        localStorage.setItem("token", authToken);

        console.log("Login successful! Token:", authToken);

        // Redirect to the home page
        navigate("/home");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <h2>Login</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
