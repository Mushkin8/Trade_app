import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./components/Dashboard"; // ✅ ADD THIS

function App() {
  return (
    <Routes>
      {/* default */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* protected */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />   {/* ✅ FIXED */}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;