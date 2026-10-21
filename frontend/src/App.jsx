import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import useAuth from "./hooks/useAuth.js";
import Dashboard from "./pages/Dashboard.jsx";
import Advisor from "./pages/Advisor.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import VehicleProfile from "./pages/VehicleProfile.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import { MaintenancePage, ModificationsPage } from "./pages/GaragePages.jsx";

function LoadingPage() {
  return (
    <div className="auth-page">
      <p role="status">Checking your sign-in status...</p>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingPage />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!user.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
}

function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingPage />;
  }
  return user ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/vehicle" element={<ProtectedRoute><VehicleProfile /></ProtectedRoute>} />
          <Route path="/modifications" element={<ProtectedRoute><ModificationsPage /></ProtectedRoute>} />
          <Route path="/maintenance" element={<ProtectedRoute><MaintenancePage /></ProtectedRoute>} />
          <Route path="/advisor" element={<ProtectedRoute><Advisor /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
