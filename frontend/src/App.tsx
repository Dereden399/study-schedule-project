import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";
import SchedulesPage from "./pages/SchedulesPage";
import NaNPage from "./pages/NaNPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SchedulePage from "./pages/SchedulePage";

function App() {
  return (
    <Box>
      <NavBar />
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/schedules/:id" element={<SchedulePage />} />
        <Route path="/schedules" element={<SchedulesPage />} />
        <Route path="*" element={<NaNPage />} />
      </Routes>
    </Box>
  );
}

export default App;
