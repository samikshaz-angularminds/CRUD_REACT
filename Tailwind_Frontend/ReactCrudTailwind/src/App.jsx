import { useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeList from "./pages/EmployeeList";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/header.component";
import { getToken } from "./services/token.service";

function App() {
  return (
    <>
      <ThemeProvider>
        {getToken() && <Header />}
        <Routes>
          <Route path="/" element={getToken() ? <Navigate to="/employee-list" /> : <Login />} />
          <Route path="/login" element={getToken() ? <Navigate to="/employee-list" /> : <Login />} />
          <Route path="/register" element={getToken() ? <Navigate to="/employee-list" /> : <Register />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
