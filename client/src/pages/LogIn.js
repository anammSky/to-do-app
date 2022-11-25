import "../assets/logins.css";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function LogIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [loggedIn, setLoggedIn] = useState(cookies.get("token") !== undefined);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch("http://127.0.0.1:5001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const json = await response.json();
        if (response.status === 200) {
            // Successfully signed in
            const token = json.token;
            cookies.set("token", token);
            cookies.set("name", JSON.parse(atob(token.split(".")[1])).data.dataValues.name);
            setLoggedIn(true);
        } else {
            let newError;
            if (json.errors) {
                newError = json.errors[0].msg;
            } else {
                newError = json.message;
            }
            setErrorMsg(newError);
        }
    }
    return loggedIn ? (
        <Navigate to="/" />
    ) : (
        <main className="login__main is--center-screen">
            <div className="login__container">
                <form onSubmit={handleSubmit} className="login__form">
                    <h1 className="login__title">Log In</h1>
                    {errorMsg && <p className="error-msg">{errorMsg}</p>}
                    <section className="login__section">
                        <label className="login__label" htmlFor="email">
                            email
                        </label>
                        <input
                            className="login__input"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        ></input>
                    </section>
                    <section className="login__section">
                        <label className="login__label" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="login__input"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        ></input>
                    </section>
                    <section className="login__section__btn">
                        <button type="submit" className="btn login__btn" id="btnLogIn">
                            Log In
                        </button>
                        <button type="button" className="btn login__btn" id="btnSignUp">
                            <Link to="/signup">Sign Up</Link>
                        </button>
                    </section>
                </form>
            </div>
        </main>
    );
}
