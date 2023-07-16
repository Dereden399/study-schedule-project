import { useDispatch } from "react-redux";
import { store } from "../store/index";

const useAppDispatch: () => typeof store.dispatch = useDispatch;

export default useAppDispatch;
