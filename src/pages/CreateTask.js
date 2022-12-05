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
    const initialState = JSON.parse(taskLists);
    return initialState || [];
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
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task === "") {
      setError("Task Field should not be empty");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      let newTask = {
        id: uuid(),
        task: task,
      };
      addTask(newTask);
      setTask("");
      setSuccess("Task added successfully");
      setTimeout(() => {
        setSuccess("");
        navigator("/list-tasks");
      }, 2000);
    }
  };

  return (
    <div className="ml-4">
      <label>
        <h1>Task</h1>
        <input
          className="form-control"
          type="text"
          value={task}
          onChange={handleInput}
          placeholder="Write your task here"
        />
      </label>
      <Error>{error}</Error>
      <Success>{success}</Success>
      <br />
      <Button onClick={handleSubmit}> Save</Button>
    </div>
  );
};
