import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
//import DashboardCards from "./pages/DashboardCards";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import DashboardCards from "./pages/DashboardCards";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Navigate to="/login" replace />}></Route>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardCards />
            </ProtectedRoute>
          }
        />
        <Route
        path="/client-details/:id"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
        />
      </Routes>
    </Router>
  );
}

export default App;