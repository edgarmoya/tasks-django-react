import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/authContext";
import { PATH_HOME, PATH_TASKS, PATH_LOGIN } from "./routes/Paths";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={PATH_LOGIN} element={<LoginPage />} />
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path={PATH_HOME} element={<Navigate to={PATH_LOGIN} />} />
            <Route path={PATH_TASKS} element={<TasksPage />} />
            <Route path="/tasks-create/" element={<TaskFormPage />} />
            <Route path="/tasks/:id" element={<TaskFormPage />} />
          </Route>
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
