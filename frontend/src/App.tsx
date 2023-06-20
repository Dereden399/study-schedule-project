import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";
import SchedulesPage from "./pages/SchedulesPage";

function App() {
  return (
    <Box>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/schedules" element={<SchedulesPage />} />
      </Routes>
    </Box>
  );
}

export default App;
