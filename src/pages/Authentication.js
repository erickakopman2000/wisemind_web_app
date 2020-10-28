import React, { useState } from "react";

export default function Authentication() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <div className="AuthenticationPage">
      <h1>Login</h1>
      <div className="loginForm">
        <div>
          <h3>Email</h3>
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
            onchange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <button onChange={() => console.log("Logging In!")}>Login</button>
      </div>
    </div>
  );
}
