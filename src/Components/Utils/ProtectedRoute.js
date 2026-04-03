import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import { Navigate } from "react-router";
function ProtectedRoute({ children, allowedRoles = [] }) {
  const { loggedIn, user } = useContext(AuthContext);

  if (loggedIn === null) {
    return null;
  }
  if (!loggedIn) {
    return <Navigate to="/Login" />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/Login" />;
  }
  return children;
}
export default ProtectedRoute;
