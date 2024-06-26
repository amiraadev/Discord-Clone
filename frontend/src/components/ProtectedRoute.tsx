import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../stores/useAuth"; // Replace with your authentication hook

export const ProtectedRoute = ({ children }) => {
  const { fullname } = useAuth();
  const location = useLocation();
console.log(fullname);

  if (!fullname) {
    // Redirect to login if not authenticated, with current location as state
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
};
