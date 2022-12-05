import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Wrapper = styled.section`
  width: 100%;
  background: #f5f5f5;
  height: 100vh;
  padding: 5em;
`;
const Card = styled.div`
  background: #281212;
  padding: 3em 5em;
  min-width: auto;
  min-height: auto;
  color: #fff;
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: black;
  color: white;
  border-radius: 13px;
  cursor: pointer;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
`;
const StyledLink = styled(Link)`
  color: #f5f5f5;
  font-weight: bold;
  text-decoration: none;
`;

const Task = styled.span`
  padding-left: 10px;
`;

const Row = styled.div``;
const Column = styled.div``;
export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const getTasks = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      setTasks(tasks);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);
  const deleteTasks = () => {
    let index = tasks.filter((x) => x === selectedTask);
    tasks.splice(index, 1);
    setTasks([...tasks]);
  };
  const handleDelete = (e) => {
    const { value, checked } = e.target;
    console.log(`${value} is ${checked} `);
    if (checked === true) {
      setSelectedTask([...selectedTask, value]);
      console.log(selectedTask);
      if (selectedTask.length > 0) {
        setShowDelete(true);
      }
    } else {
      setSelectedTask(selectedTask.filter((item) => item !== value));
      console.log(selectedTask);
    }
  };

  return (
    <Wrapper>
      <h1 className="text-center">Task List</h1>
      <ButtonWrapper>
        <Button>
          <StyledLink className="text-decoration" to="/create-task">
            Create Task
          </StyledLink>
        </Button>
      </ButtonWrapper>
      {showDelete ? <Button onClick={() => deleteTasks()}>Delete</Button> : ""}

      <Row className="row">
        {tasks.length > 0
          ? tasks.map((task) => {
              return (
                <Column className="col-4 pb-2 pt-2" key={task.id}>
                  <Card>
                    <label>
                      <input
                        type="checkbox"
                        value={task.id}
                        onClick={(e) => handleDelete(e)}
                      />
                    </label>
                    <Task>{task.task}</Task>
                  </Card>
                </Column>
              );
            })
          : "Not Task Exist"}
      </Row>
    </Wrapper>
  );
};
