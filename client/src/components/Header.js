import React from "react";
import { Link } from "react-router-dom";
import "../assets/header.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Header() {
    return (
        <header className="header">
            <h1 className="header__title">The todolist</h1>
            <div className="header__right-container">
                <p className="header__username">{cookies.get("name")}</p>
                <Link to="/logout" className="header__logout btn">
                    Log Out
                </Link>
            </div>
        </header>
    );
}
