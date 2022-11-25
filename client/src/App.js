import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn";
import LogOut from "./pages/LogOut";
import SignUp from "./pages/SignUp";
import NoPage from "./pages/NoPage";
import Tasks from "./pages/Tasks";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="login" element={<LogIn />} />
            <Route path="logout" element={<LogOut />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
    );
}
