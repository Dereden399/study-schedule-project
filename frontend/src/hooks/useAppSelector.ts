import { TypedUseSelectorHook, useSelector } from "react-redux";
import { store } from "../store/index";

const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> =
  useSelector;

export default useAppSelector;
