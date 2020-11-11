import React, { useState } from "react";
import "./styles/App.scss";
import firebase from "./firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Pages
import Header from "./components/Header";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(
    localStorage.getItem("currentUser") !== undefined
      ? JSON.parse(localStorage.getItem("currentUser"))
      : firebase.auth().currentUser
  );

  function setUserState(newUserState) {
    setUser(newUserState);
  }

  return (
    <div className="App">
      <Router>
        <Header user={user} setUser={setUserState} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth">
            {user === null ? (
              <Authentication user={user} setUser={setUserState} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/profile/:id" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
