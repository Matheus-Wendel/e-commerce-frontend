import React, { Component } from "react";

import cart from "./views/cart/cart";

import signUp from "./views/signUp/signUp";

import login from "./views/login/login";

import home from "./views/home/home";

import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  PrivateRoute({ component: Component, authed, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authed === true ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    );
  }
  PublicRoute({ component: Component, authed, ...rest }) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  NotFoundRoute({ component: Component, authed, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authed === true ? (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <this.PublicRoute
            path="/"
            //authed={this.state.isLoggedIn}
            exact
            component={home}
          />
          <this.PublicRoute
            path="/login"
            //authed={this.state.isLoggedIn}
            exact
            component={login}
          />
          <this.PublicRoute
            path="/signUp"
            //authed={this.state.isLoggedIn}
            exact
            component={signUp}
          />
          <this.PublicRoute
            path="/cart"
            //authed={this.state.isLoggedIn}
            exact
            component={cart}
          />

          <this.NotFoundRoute //authed={this.state.isLoggedIn}
            component={home}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
