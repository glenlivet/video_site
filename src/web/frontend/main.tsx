import React from "react";
import ReactDOM from "react-dom";
import { Button } from "primereact/button"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "./styles/app.scss";

const App = () => {
  return (
    <div className="app">
    <Button />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      {/* A <Switch> looks through its children <Route>s and
    renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

const Home = () => {
  return (
    <div>
    </div>
  );
};
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
