import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";
const useBiz = () => {
  const dispatch = useDispatch();
  return () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const payload = jwt_decode(token);

    dispatch(authActions.isBiz(payload.biz));
  };
};

export default useBiz;
