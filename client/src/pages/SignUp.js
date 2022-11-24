import "../assets/logins.css";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    repeatPassword: "",
  });
  // do something about passwords
  // validate paswords match

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    // function to api login
  }
  return (
    <main className="login__main is--center-screen">
      <div className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1 className="login__title">Sign Up</h1>
          <section className="login__section">
            <label className="login__label" htmlFor="username">
              Username
            </label>
            <input
              className="login__input"
              type="text"
              id="username"
              name="username"
              value={formData.username}
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
