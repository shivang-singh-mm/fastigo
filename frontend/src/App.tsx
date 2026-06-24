import {
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Project";
import Tasks from "./pages/Tasks";
import Insights from "./pages/Insights";

function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/projects"
        element={<Projects />}
      />

      <Route
        path="/tasks"
        element={<Tasks />}
      />

      <Route
        path="/insights/:taskId"
        element={<Insights />}
      />

    </Routes>
  );
}

export default App;