import React, { useState } from "react";
import { signin, signup } from "../firebaseAuthModule";
import firebase from "../firebase";

export default function Authentication({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginView, setLoginView] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    // signin to firebase
    signin(
      email,
      password,
      () => {
        console.log("Sign in success!");
        let user = firebase.auth().currentUser;
        setUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        setTimeout(() => window.open("/", "_self"), 500);
      },
      () => console.log("Signin failed")
    );
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const confirmed =
      email === confirmEmail && password === confirmPassword ? true : false;

    if (confirmed) {
      signup(email, password, () => {
        console.log("Verification email sent!");
        let user = firebase.auth().currentUser;
        setUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        setTimeout(() => window.open("/", "_self"), 500);
      });
    } else {
      if (email !== confirmEmail && password !== confirmPassword)
        window.alert("Your emails and passwords don't match!");
      else if (password !== confirmPassword)
        window.alert("Your passwords don't match!");
      else window.alert("Your emails don't match!");
    }
  };

  return (
    <div
      className="AuthenticationPage"
      style={!loginView ? { overflowX: "hidden" } : {}}
    >
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
            Or don't have an account?
          </span>
        </h4>
      </form>
      <form
        className="form signupForm"
        style={loginView ? { left: "100%" } : {}}
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
            value={confirmEmail}
            type="email"
            onChange={(e) => setConfirmEmail(e.target.value)}
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
            value={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <button onChange={() => console.log("Logging In!")}>Sign Up</button>
        <h4 onClick={() => setTimeout(() => setLoginView(true), 500)}>
          Already have an account? Login
        </h4>
      </form>
    </div>
  );
}
