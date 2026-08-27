import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute() {
  const { isAuthenticated, initialized } = useAuth();

  // The auth cookie is httpOnly, so we can't just read localStorage —
  // we have to wait for the /me check (triggered inside useAuth) to
  // resolve before we know whether there's a real session.
  if (!initialized) {
    return (
      <div style={{ padding: "160px 24px", textAlign: "center", color: "#9CA3AF" }}>
        Checking session…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
