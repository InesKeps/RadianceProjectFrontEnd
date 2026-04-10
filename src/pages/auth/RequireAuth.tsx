import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type RequireAuthProps = {
  allowedRoles?: string[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const auth = useAuth();
  const location = useLocation();

  const role = auth?.userInfo?.userToLogin?.role;
  const testRole = role ? allowedRoles?.includes(role) : false;

  return testRole
    ? <Outlet />
    : auth?.userInfo?.userToLogin
      ? <Navigate to="/forbidden" state={{ from: location }} replace />
      : <Navigate to="/login" state={{ from: location }} replace />;

};

export default RequireAuth;

