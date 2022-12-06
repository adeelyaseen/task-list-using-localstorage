import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TaskList } from "./pages/TaskList";
import { CreateTask } from "./pages/CreateTask";
import { Layout } from "./Layout";
import { BulkDelete } from "./pages/BulkDelete";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/list-tasks" replace />} />
          <Route path="/list-tasks" element={<TaskList />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="bulk-delete" element={<BulkDelete />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
