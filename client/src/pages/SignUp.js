import "../assets/logins.css";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    repeatPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("this is an error");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      return;
    }
    delete formData.repeatPassword;
    console.log("submitting...");
    const resp = await fetch("http://127.0.0.1:5001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await resp.json();

    setErrorMsg(json.msg);
  }
  return (
    <main className="login__main is--center-screen">
      <div className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1 className="login__title">Sign Up</h1>
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <section className="login__section">
            <label className="login__label" htmlFor="name">
              Name
            </label>
            <input
              className="login__input"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            ></input>
          </section>
          <section className="login__section">
            <label className="login__label" htmlFor="email">
              Email
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
          <section className="login__section">
            <label className="login__label" htmlFor="repeatPassword">
              Repeat Password
            </label>
            <input
              className="login__input"
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
            ></input>
          </section>
          <section className="login__section__btn">
            <button type="submit" className="btn login__btn">
              {/* <Link to="/">Sign Up</Link>
              Sign up and log in validation
            */}
              Sign Up
            </button>
            <button type="button" className="btn btn--danger login__btn">
              <Link to="/login">Cancel</Link>
            </button>
          </section>
        </form>
      </div>
    </main>
  );
}
