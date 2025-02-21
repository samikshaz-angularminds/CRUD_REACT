import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmployeeList from "./pages/EmployeeList";
import Header from "./components/Header";
import { getToken } from "./services/token-decode-service";
import ProtectedRoute from "./protectedRoute";
import AdminProfile from "./pages/AdminProfile";

function App() {

const isLoggedIn = getToken();
  return (
    <div >
        <Routes>
          <Route path="/register" element={isLoggedIn ? <Navigate to={"/employee-list"} /> : <Register />} />
          <Route path="/"  element={isLoggedIn ? <Navigate to={"/employee-list"} /> : <Login />} />

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
              <AdminProfile />
            </ProtectedRoute>
          }
          />
          
        </Routes>
    </div>
  );
}

export default App;
