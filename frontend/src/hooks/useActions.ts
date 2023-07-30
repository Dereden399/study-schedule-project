import { bindActionCreators } from "@reduxjs/toolkit";
import { login } from "../store/reducers/actions/login";
import { userReducer } from "../store/reducers/userReducer";
import { courseReducer } from "../store/reducers/courseReducer";
import { scheduleReducer } from "../store/reducers/scheduleReducer";
import useAppDispatch from "./useAppDispatch";

const actions = {
  ...userReducer.actions,
  ...courseReducer.actions,
  ...scheduleReducer.actions,
  login,
};

const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
};

export default useActions;
