import React from "react";
import "./styles/App.scss";
import firebase from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import Header from "./components/Header";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          {firebase.auth().currentUser === null && (
            <Route path="/auth" component={Authentication} />
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
