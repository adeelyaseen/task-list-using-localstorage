import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
const Task = styled.span`
  padding-left: 10px;
`;

const Row = styled.div``;
const Column = styled.div``;

export const BulkDelete = () => {
  const [tasks, setTasks] = useState(() => {
    const taskLists = localStorage.getItem("tasks");
    const initialList = JSON.parse(taskLists);
    return initialList || [];
  });
  const [selectedTask, setSelectedTask] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTasks = () => {
    let data = tasks.filter((item) => !selectedTask.includes(item.id));
    setTasks(data);
    setMessage("Tasks Deleted Successfully");
  };

  const handleDelete = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTask([...selectedTask, value]);
    } else {
      setSelectedTask(selectedTask.filter((item) => item !== value));
    }
  };

  return (
    <Wrapper>
      <h1 className="text-center">Task List</h1>
      {tasks.length > 0 && (
        <DeleteButton onClick={deleteTasks}>Delete</DeleteButton>
      )}

      <Row className="row">
        {tasks.length > 0
          ? tasks.map((task) => {
              return (
                <Column className="col-lg-4 col-xs-12 pb-2 pt-2" key={task.id}>
                  <Card>
                    <label>
                      <input
                        type="checkbox"
                        value={task.id}
                        onChange={(e) => handleDelete(e)}
                        checked={task.selectedTask}
                      />
                    </label>
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
