import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, condition, redirectTo = "/login" }) => {
  const { authChecked } = useAuth();

  if (!authChecked) return null;

  return condition ? children : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;