import "../assets/logins.css";

export default function LogIn() {
  return (
    <main className="login__main is--center-screen">
      <div className="login__container">
        <form className="login__form">
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
            ></input>
          </section>
          <section className="login__section">
            <label className="login__label" htmlFor="repeat-password">
              Repeat Password
            </label>
            <input
              className="login__input"
              type="password"
              id="repeat-password"
              name="repeat-password"
            ></input>
          </section>
          <section className="login__section__btn">
            <button className="btn login__btn">Sign Up</button>
            <button className="btn btn--danger login__btn">Cancel</button>
          </section>
        </form>
      </div>
    </main>
  );
}
