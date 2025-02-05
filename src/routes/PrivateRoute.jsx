import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingSpinner />;
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} />;
}

export default PrivateRoute;
