import React from "react";

// Import Components
import Body from "../components/Body";

export default function Home() {
  console.log(JSON.parse(localStorage.getItem("currentUser")));

  return (
    <div className="HomePage">
      <Body />
    </div>
  );
}
