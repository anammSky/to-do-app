import React from "react";
import "../assets/header.css";
export default function Header() {
  return (
    <header className="header">
      <h1 className="header__title">The todolist</h1>
      <div className="header__right-container">
        <p className="header__username">Username</p>
        {/* add log out function */}
        <button className="header__logout btn">Log Out</button>
      </div>
    </header>
  );
}
