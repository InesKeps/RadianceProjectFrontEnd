// import { Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../store/store";
// import type { Role } from "../types/user";
// import type { JSX } from "react";

// interface ProtectedRouteProps {
//   children: JSX.Element;
//   requiredRole?: Role;
// }

// const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
//   const location = useLocation();
//   const auth = useSelector((state: RootState) => state.auth);

//   const isAuthenticated = !!auth.token;
//   const userRole = auth.userInfo?.user?.role;

//   console.log("userRole:", userRole, "requiredRole:", requiredRole);
//   console.log("auth:", auth.userInfo?.user);


//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (requiredRole && userRole === requiredRole) {
//     return <Navigate to="/forbidden" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

