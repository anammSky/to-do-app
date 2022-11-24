import "../assets/logins.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LogIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  // do something about passwords
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
        <form onSubmit={handleSubmit} className="login__form">
          <h1 className="login__title">Log In</h1>
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
              {/* <Link to="/">Log In</Link>
              Log in Validation
            */}
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
