import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReferralForm from "./pages/ReferralForm";
// import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  const token = useSelector((state) => state.auth.token);
  console.log(token)

  return (
    <Routes>
      {/* Default: Redirect / to /login if not logged in */}
      <Route
        path="/"
        element={
          token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
        
            <Dashboard />
    
        }
      />

      <Route
        path="/refer"
        element={
  
            <ReferralForm />

        }
      />

      {/* Catch-all: redirect unknown paths */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
