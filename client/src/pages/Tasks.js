import Main from "../components/Main";
import Header from "../components/Header";
import Boards from "../components/Boards";
import Footer from "../components/Footer";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

const cookies = new Cookies();

export default function Tasks() {
    return cookies.get("token") === undefined ? (
        <Navigate to="/login" />
    ) : (
        <>
            <Header />
            <Boards />
            <Main />
            <Footer />
        </>
    );
}
