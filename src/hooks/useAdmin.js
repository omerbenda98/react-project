import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";
const useAdmin = () => {
  const dispatch = useDispatch();
  return () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const payload = jwt_decode(token);
    dispatch(authActions.isAdmin(payload.isAdmin));
  };
};

export default useAdmin;
