import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./index.css";

const StudentAndTeacherList = () => {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const fetchUsers = async () => {
    try {
      const studentsResponse = await fetch("http://localhost:3001/students");
      const studentsData = await studentsResponse.json();
      setStudents(studentsData);

      const teachersResponse = await fetch("http://localhost:3001/teachers");
      const teachersData = await teachersResponse.json();
      setTeachers(teachersData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      password,
      role,
      grade: role === "student" ? grade : null,
      subject: role === "teacher" ? subject : null,
    };

    try {
      // Send POST request to create a new user
      const response = await fetch(`http://localhost:3001/${role}s`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        fetchUsers(); // Refresh the lists after adding a new user
      } else {
        console.error("Failed to create new user:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="">
      <div className="form">
        <h2>Create New User</h2>
        <Form onSubmit={handleSubmit}>
          <div>
            <Form.Label>
              Name:
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Label>
          </div>
          <div>
            <Form.Label>
              Password:
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Label>
          </div>
          <div>
            <Form.Label>
              Role:
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </Form.Select>
            </Form.Label>
          </div>
          {role === "student" && (
            <div>
              <Form.Label>
                Grade:
                <Form.Control
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                />
              </Form.Label>
            </div>
          )}
          {role === "teacher" && (
            <div>
              <Form.Label>
                Subject:
                <Form.Control
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </Form.Label>
            </div>
          )}
          <Button type="submit">Create User</Button>
        </Form>
      </div>

      <div className="students">
        <h3>Students</h3>
        <ListGroup>
          {students.map((student) => (
            <ListGroup.Item key={student.student_id}>
              {student.name} - Grade: {student.grade}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="teachers">
        <h3>Teachers</h3>
        <ListGroup>
          {teachers.map((teacher) => (
            <ListGroup.Item key={teacher.teacher_id}>
              {teacher.name} - Subject: {teacher.subject}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default StudentAndTeacherList;
