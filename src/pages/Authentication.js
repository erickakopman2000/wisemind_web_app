import React, { useState } from "react";
import { signin, signup, setPassResetEmail } from "../firebaseAuthModule";
import firebase from "../firebase";

export default function Authentication({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginView, setLoginView] = useState(false);

  const [signupView, setSignupView] = useState(0);
  console.log(signupView);

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
    // const confirmed =
    //   email === confirmEmail && password === confirmPassword ? true : false;

    // if (confirmed) {
    //   signup(email, password, () => {
    //     console.log("Verification email sent!");
    //     let user = firebase.auth().currentUser;
    //     setUser(user);
    //     localStorage.setItem("currentUser", JSON.stringify(user));
    //     setTimeout(() => window.open("/", "_self"), 500);
    //   });
    // } else {
    //   if (email !== confirmEmail && password !== confirmPassword)
    //     window.alert("Your emails and passwords don't match!");
    //   else if (password !== confirmPassword)
    //     window.alert("Your passwords don't match!");
    //   else window.alert("Your emails don't match!");
    // }
    let myint = signupView + 1;
    setSignupView(myint);
    console.log(signupView);
  };

  return (
    <div
      className="AuthenticationPage"
      style={!loginView ? { overflowX: "hidden" } : {}}
    >
      <form
        onSubmit={handleSignup}
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
          <span
            onClick={() =>
              setPassResetEmail("waris.blsc@gmail.com", () =>
                console.log("pass resent email sent, check your inbox")
              )
            }
          >
            Forgot password?
          </span>{" "}
          <br />
          <br />{" "}
          <span onClick={() => setLoginView(false)}>
            Or don't have an account?
          </span>
        </h4>
      </form>

      <div style={loginView ? { left: "100%" } : {}} className="signupDiv">
        <h1 className="signupTitle ">Sign Up</h1>
        <form
          onSubmit={handleSignup}
          className="form signup1"
          style={signupView === 0 ? {} : { left: "-200%" }}
        >
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

          <button onChange={() => setSignupView(1)}>Next</button>
        </form>

        <form
          onSubmit={handleSignup}
          className="form signup2"
          style={
            signupView < 1
              ? {}
              : signupView === 1
              ? { right: "0%" }
              : { right: "200%" }
          }
        >
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
          <button onChange={() => setSignupView(2)}>Next</button>
        </form>

        <form
          onSubmit={handleSignup}
          className="form signup3"
          style={
            signupView === 2
              ? { right: "0%" }
              : signupView > 2
              ? { right: "200%" }
              : {}
          }
        >
          <div>
            <h3>Name</h3>
            <input value={password} type="text" placeholder="Password" />
          </div>

          <div>
            <h3>Username</h3>
            <input value={confirmPassword} type="text" placeholder="Password" />
          </div>
          <button onChange={() => setSignupView(3)}>Next</button>
        </form>

        <form
          onSubmit={handleSignup}
          className="form signup4"
          style={signupView === 3 ? { right: "0%" } : {}}
        >
          <div style={{ textAlign: "center" }}>
            <h3>Take a Photo</h3>
            <div
              style={{ height: 200, width: 200 }}
              className="imgPreviewer"
            ></div>
          </div>
          <button onChange={() => setSignupView(4)}>Next</button>
        </form>

        <h4
          style={{ paddingTop: "20px" }}
          onClick={() => setTimeout(() => setLoginView(true), 500)}
        >
          Already have an account? Login
        </h4>
      </div>
    </div>
  );
}
