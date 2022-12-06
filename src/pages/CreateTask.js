import React, { useState, useEffect } from "react";
import styled from "styled-components";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
const Button = styled.button`
  display: inline-block;
  flex: 1;
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  background-color: green;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
  padding-left: 10px;
`;

const Success = styled(Error)`
  color: green;
`;
export const CreateTask = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const taskLists = localStorage.getItem("tasks");
    const initialList = JSON.parse(taskLists);
    return initialList || [];
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInput = (e) => {
    setTask(e.target.value);
  };
  const addTask = (e) => {
    e.preventDefault();
    if (task) {
      const newTask = { id: uuid(), task: task };
      setTasks([...tasks, newTask]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
      setTask("");
      setSuccess("Task added successfully");
      setTimeout(() => {
        setSuccess("");
        navigator("/list-tasks");
      }, 1000);
    } else {
      setError("Task Field should not be empty");
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  return (
    <div className="p-4">
      <label>
        <h1>Task</h1>
        <input
          className="form-control"
          type="text"
          value={task}
          onChange={handleInput}
          placeholder="Write your task here"
        />
        {error && <Error>{error}</Error>}
        {success && <Success>{success}</Success>}
      </label>
      <br />
      <Button onClick={addTask}>Save</Button>
    </div>
  );
};
