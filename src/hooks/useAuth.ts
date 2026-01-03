// import { useContext } from "react";
// import AuthContext from "../context/AuthProvider";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store"; 

const useAuth = () => useSelector((state: RootState) => state.auth);


// const useAuth = () => {
//   const context = useContext(AuthContext);

//   return context;
// }

export default useAuth;

