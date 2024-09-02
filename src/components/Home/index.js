import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import StudentAndTeacherList from "../StudentAndTeacherList";

const Home = () => {
  const student = localStorage.getItem("role") === "student";

  const [grade, setGrade] = useState(null);
  const [subject, setSubject] = useState(null);

  const url = student
    ? "http://localhost:3001/students"
    : "http://localhost:3001/teachers";

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.ok) {
        // Find the current user from the fetched data
        const user = result.find(
          (each) => each.name === localStorage.getItem("name")
        );
        if (user) {
          // Set grade or subject based on the role
          if (student) {
            localStorage.setItem("grade", user.grade);
            setGrade(user.grade);
          } else {
            localStorage.setItem("subject", user.subject);
            setSubject(user.subject);
          }
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <nav className="navbar bg-body-tertiary justify-content-between p-3">
        <h1 className="login-title">Dashboard</h1>
        <Link to="/login">
          <button className="btn btn-primary">Logout</button>
        </Link>
      </nav>

      <div className="dashboard-content">
        {student ? (
          <img
            src="https://cdn-icons-png.flaticon.com/128/3135/3135810.png"
            alt="student"
            className="image text-center"
          />
        ) : (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4z2kDiP5Uu3cqVFTSRGRT_pQbAuXUWdWmWOMRQK_a-gD51xTYwQSBB-CfYYnhL3eScss&usqp=CAU"
            alt="teacher"
            className="image"
          />
        )}
        <h1>{localStorage.getItem("name")}</h1>
        {student ? <p>{grade} Grade Student</p> : <p>{subject} Teacher</p>}
      </div>
      <StudentAndTeacherList />
    </div>
  );
};

export default Home;
