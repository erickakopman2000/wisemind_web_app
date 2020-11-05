import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_svg.svg";
import menu from "../assets/menu.svg";
import firebase from "../firebase";
import { signout } from "../firebaseAuthModule";

export default function Header({ user, setUser }) {
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="Wisemind Logo" />
      </Link>
      <div>
        {user != null ? (
          <h4
            style={{ cursor: "pointer" }}
            onClick={() => {
              signout(() => {
                console.log("signout successful");
                localStorage.removeItem("currentUser");
                setUser(firebase.auth().currentUser);
              });
            }}
          >
            Logout
          </h4>
        ) : (
          <Link to="/auth" style={{ textDecoration: "none", color: "black" }}>
            <h4>Login | Sign Up</h4>
          </Link>
        )}
        <img className="MenuIcon" src={menu} alt="menu" />
      </div>
    </nav>
  );
}
