import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import { Navigate } from "react-router";
function ProtectedRoute({ children, allowedRoles = [] }) {
  const { loggedIn, user, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  if (!loggedIn) {
    return <Navigate to="/Login" />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/Login" />;
  }
  return children;
}
export default ProtectedRoute;
