import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function LogOut() {
    cookies.remove("token");
    cookies.remove("name");
    return <Navigate to="/login" />;
}
