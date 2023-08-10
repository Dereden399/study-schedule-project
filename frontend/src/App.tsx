import { Box, createStandaloneToast } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import SchedulesPage from "./pages/SchedulesPage";
import NaNPage from "./pages/NaNPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SchedulePage from "./pages/SchedulePage";
import { useEffect } from "react";
import useAppDispatch from "./hooks/useAppDispatch";
import checkToken from "./store/reducers/actions/checkToken";
import useAppSelector from "./hooks/useAppSelector";

const { ToastContainer, toast } = createStandaloneToast();

// eslint-disable-next-line react-refresh/only-export-components
export { toast };

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(checkToken(token));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
      <NavBar />
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/schedules/:id" element={<SchedulePage />} />
        <Route path="/schedules" element={<SchedulesPage />} />
        <Route path="*" element={<NaNPage />} />
      </Routes>
      <ToastContainer />
    </Box>
  );
}

export default App;
