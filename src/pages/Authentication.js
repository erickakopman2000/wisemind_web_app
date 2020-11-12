import React, { useState } from "react";
import { signin, signup, setPassResetEmail } from "../firebaseAuthModule";
import firebase from "../firebase";

export default function Authentication({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginView, setLoginView] = useState(true);

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

  const imagePreviewHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) setProfileImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
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
        className="form loginForm"
        style={
          loginView
            ? { top: "50px", margin: 0 }
            : { top: "50px", left: "-100%" }
        }
        onSubmit={handleLogin}
      >
        <h1>Login</h1>
        <div>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div>
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
        <p className="message">What's your email?</p>
        <form
          onSubmit={handleSignup}
          className="form signup1"
          style={signupView === 0 ? {} : { left: "-200%" }}
        >
          <div>
            {/* <h3>Email</h3> */}
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div>
            {/* <h3>Confirm Email</h3> */}
            <input
              value={confirmEmail}
              type="email"
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Confirm Email"
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
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <div>
            <input
              value={confirmPassword}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
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
            <input
              value={name}
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <input
              value={username}
              type="text"
              placeholder="Choose a username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button onChange={() => setSignupView(3)}>Next</button>
        </form>

        <form
          onSubmit={handleSignup}
          className="form signup4"
          style={signupView === 3 ? { right: "0%" } : {}}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ height: 200, width: 200 }} className="imgPreviewer">
              <img
                style={profileImage ? {} : { zIndex: -1 }}
                src={profileImage}
                alt="profile"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={imagePreviewHandler}
            />
            <h3>{!profileImage ? "Choose a profile image" : ""}</h3>
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
