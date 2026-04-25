import { useLocation } from "react-router";

const useRoutePrefix = () => {
  const location = useLocation();
  return location.pathname.startsWith("/user") ? "/user" : "/admin";
};

export default useRoutePrefix;

