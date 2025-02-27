import { useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeList from "./pages/EmployeeList";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/header.component";
import { getToken } from "./services/token.service";
import ProtectedRoute from "./protectedRoute/protectedRoute";

function App() {
  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route
            path="/"
            element={getToken() ? <Navigate to="/employee-list" /> : <Login />}
          />
          <Route
            path="/login"
            element={getToken() ? <Navigate to="/employee-list" /> : <Login />}
          />
          <Route
            path="/register"
            element={
              getToken() ? <Navigate to="/employee-list" /> : <Register />
            }
          />

          <Route
            path="/employee-list"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />

<Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
