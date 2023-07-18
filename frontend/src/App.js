import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/authContext";
import Paths from "./routes/Paths";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={Paths.HOME} element={<Navigate to={Paths.LOGIN} />} />
          <Route path={Paths.ADMIN} element={<AdminPage />} />
          <Route path={Paths.LOGIN} element={<LoginPage />} />

          <Route element={<PrivateRoute />}>
            <Route path={Paths.TASKS} element={<TasksPage />} />
          </Route>
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
