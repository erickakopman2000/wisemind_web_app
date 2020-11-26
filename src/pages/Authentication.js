import React, { useState } from "react";
import { signin, signup, setPassResetEmail } from "../firebaseAuthModule";
import firebase from "../firebase";

export default function Authentication({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginView, setLoginView] = useState(true);

  const [signupView, setSignupView] = useState(0);

  let message;

  switch (signupView) {
    case 0:
      message = "First, what's your email?";
      break;
    case 1:
      message = "Okay, now choose a password.";
      break;
    case 2:
      message = "What do you call yourself?";
      break;
    case 3:
      message = "Lastly, pick a profile picture.";
      break;
    default:
      break;
  }

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
      if (reader.readyState === 2) setProfileImagePreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setProfileImage(e.target.files[0]);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (signupView !== 3) {
      setSignupView(signupView + 1);
    } else {
      const emailConfirmed = email === confirmEmail;
      const passwordConfirmed = password === confirmPassword;

      const confirmed = emailConfirmed && passwordConfirmed;

      if (confirmed) {
        const sendData = (uid) => {
          // upload image
          let imageUpload = firebase
            .storage()
            .ref(`${username}/profileImages/${profileImage.name}`)
            .put(profileImage);

          // get upload confirmation and upload remaining data
          imageUpload.on(
            "state_changed",
            (snapshot) => {},
            (err) => {
              console.log(err);
            },
            () => {
              let data;
              firebase
                .storage()
                .ref(`${username}/profileImages`)
                .child(profileImage.name)
                .getDownloadURL()
                .then((url) => {
                  data = {
                    uid,
                    email,
                    password,
                    name,
                    username,
                    profileImageURL: url,
                  };
                  firebase.firestore().collection("users").doc(uid).set(data);
                });
            }
          );
        };

        signup(email, password, sendData, () =>
          console.log("Verification email was sent.")
        );
      }
    }

    const confirmed =
      email === confirmEmail && password === confirmPassword ? true : false;
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

      <form
        className="form signupForm"
        style={loginView ? { right: "-200%" } : { marginTop: "-534px" }}
        onSubmit={handleSignup}
      >
        <h1>Sign Up</h1>

        <p className="message">{message}</p>

        <div className="signUpDiv">
          <div
            className="inputGroup1"
            style={signupView === 0 ? {} : { left: "-200%" }}
          >
            <div>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Confirm Email"
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
            </div>
          </div>

          <div
            className="inputGroup2"
            style={
              signupView === 1
                ? { right: "0%" }
                : signupView > 1
                ? { right: "200%" }
                : {}
            }
          >
            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div
            className="inputGroup3"
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
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div
            className="inputGroup4"
            style={
              signupView === 3
                ? { right: "0%" }
                : signupView > 3
                ? { right: "200%" }
                : {}
            }
          >
            <div
              className="imagePreviewer"
              style={!profileImage ? { border: "1px solid black" } : {}}
            >
              <h4 style={profileImage ? { display: "none" } : {}}>Preview</h4>
              <img
                src={profileImagePreview}
                alt="profile"
                style={!profileImage ? { zIndex: -1 } : {}}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={imagePreviewHandler}
            />
          </div>
        </div>

        <div className="btnAndText">
          <button>{signupView !== 3 ? "Next" : "Sign Up"}</button>
          <h4>
            <span onClick={() => setLoginView(true)}>
              Already have an account? Login
            </span>
          </h4>
        </div>
      </form>
    </div>
  );
}
