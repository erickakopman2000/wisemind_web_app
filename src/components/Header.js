import React from "react";
import logo from "../assets/logo_svg.svg";
import menu from "../assets/menu.svg";
import firebase from "../firebase";
import { signout } from "../firebaseAuthModule";

export default function Header() {
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => console.log("Signed out"),
        (err) => console.log(err)
      );
  };

  return (
    <nav>
      <img src={logo} />
      <div>
        {firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log(user.uid);
            return <h4>Logout</h4>;
          } else {
            return <h4>Login | Sign Up</h4>;
          }
        })}
        <img className="MenuIcon" src={menu} />
      </div>
    </nav>
  );
}
