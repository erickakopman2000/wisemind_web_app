import React, { useState } from "react";
import { signin, signup } from "../firebaseAuthModule";

export default function Authentication() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginView, setLoginView] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    // signin to firebase
    signin(
      email,
      password,
      () => console.log("Sign in success!"),
      () => console.log("Signin failed")
    );
  };

  const handleSignup = (e) => {
    e.preventDefault();
    signup(email, password, () => {
      console.log("Verification email sent!");
      window.open("/", "_self");
    });
  };

  return (
    <div className="AuthenticationPage">
      <form
        className="form loginForm"
        style={loginView ? {} : { left: "-100%" }}
        onSubmit={handleLogin}
      >
        <h1>Login</h1>
        <div>
          <h3>Email</h3>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div>
          <h3>Password</h3>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <button onChange={() => console.log("Logging In!")}>Login</button>
        <h4>
          Forgot password? <br />
          <br />{" "}
          <span onClick={() => setLoginView(false)}>
            Or already have an account?
          </span>
        </h4>
      </form>

      <form
        className="form signupForm"
        style={loginView ? { left: "-100%" } : {}}
        onSubmit={handleSignup}
      >
        <h1>Sign Up</h1>
        <div>
          <h3>Email</h3>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div>
          <h3>Confirm Email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div>
          <h3>Password</h3>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <div>
          <h3>Confirm Password</h3>
          <input
            value={password}
            onchange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <button onChange={() => console.log("Logging In!")}>Sign Up</button>
        <h4 onClick={() => setLoginView(true)}>
          Already have an account? Login
        </h4>
      </form>
    </div>
  );
}
