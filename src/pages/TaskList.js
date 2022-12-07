import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
const Wrapper = styled.section`
  width: 100%;
  background: #f5f5f5;
  height: 100vh;
  padding: 5em;
`;
const Card = styled.div`
  background: #281212;
  color: #fff;
  padding: 2em;
  height: 150px;
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
const DeleteButton = styled(Button)`
  background-color: red;
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
const Success = styled.span`
  color: green;
  padding-left: 10px;
`;
const Row = styled.div``;
const Column = styled.div``;
export const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    const taskLists = localStorage.getItem("tasks");
    const initialList = JSON.parse(taskLists);
    return initialList || [];
  });
  const [selectedTask, setSelectedTask] = useState([]);
  const [message, setMessage] = useState("");

  const { pathname } = useLocation();
  const listPath = "/list-tasks";

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTask([...selectedTask, value]);
    } else {
      setSelectedTask(selectedTask.filter((item) => item !== value));
    }
  };
  const deleteTasks = () => {
    let data = tasks.filter((item) => !selectedTask.includes(item.id));
    setTasks(data);

    setMessage("Tasks Deleted Successfully");
    setTimeout(() => {
      setMessage("");
      setSelectedTask([]);
    }, 1000);
  };
  return (
    <Wrapper>
      <h1 className="text-center">Task List</h1>

      {pathname === listPath ? (
        <ButtonWrapper>
          <Button>
            <StyledLink className="text-decoration" to="/create-task">
              Create Task
            </StyledLink>
          </Button>
        </ButtonWrapper>
      ) : (
        <>
          <DeleteButton onClick={deleteTasks}>Delete</DeleteButton>
          {selectedTask.length > 0 && <Success>{message}</Success>}
        </>
      )}

      <Row className="row">
        {tasks.length > 0
          ? tasks.map((task) => {
              return (
                <Column className="col-lg-4 col-xs-12 pb-2 pt-2" key={task.id}>
                  <Card>
                    {pathname !== listPath && (
                      <label>
                        <input
                          type="checkbox"
                          value={task.id}
                          onChange={(e) => handleDelete(e)}
                        />
                      </label>
                    )}
                    <Task>{task.task}</Task>
                  </Card>
                </Column>
              );
            })
          : "No Task Exist"}
      </Row>
    </Wrapper>
  );
};
