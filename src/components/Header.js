import React from "react";
import logo from "../assets/logo_svg.svg";
import menu from "../assets/menu.svg";

export default function Header() {
  return (
    <nav>
      <img src={logo} />
      <div>
        <h3>Login | Sign Up</h3>
        <img className="MenuIcon" src={menu} />
      </div>
    </nav>
  );
}
