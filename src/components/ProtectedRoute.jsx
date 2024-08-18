import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedRoute = ({allowedRoles, element}) => {
  const { user } = useAuthContext();

  if (user && allowedRoles.includes(user.role)) {
    return element;
  }
  else {
    localStorage.removeItem('user'); 
    return <Navigate to="/auth" replace />;
  }
}

export default ProtectedRoute;