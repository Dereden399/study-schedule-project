import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/index";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
