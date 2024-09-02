import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const [error, setError] = useState("");

 const handleLogin = async (event) => {
   event.preventDefault();

   const loginData = { name, role, password };
   const apiUrl = "http://localhost:3001/login";

   try {
     const response = await fetch(apiUrl, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(loginData),
     });

     const data = await response.json();
          if (response.ok) {
       localStorage.setItem("name", name);
       localStorage.setItem("role", role);
       alert("Login successful!");
       navigate("/home");
     } else {
       setError(data.error || "Login failed. Please try again.");
     }
   } catch (err) {
     console.error("Login error:", err);
     setError("An error occurred. Please try again.");
   }
 };


  return (
    <div className="login-container">
      <form className="form-container" onSubmit={handleLogin}>
        <h1 className="login-title">Login</h1>
        <div className="input-container">
          <label className="form-label" htmlFor="name">
            Username
          </label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label htmlFor="role">Role</label>
          <select
            onChange={(e) => setRole(e.target.value)}
            value={role}
            className="input-field form-select"
            id="role"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <button className="btn btn-primary mt-2" type="submit">
          Login
        </button>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default Login;
