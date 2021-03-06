import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import artist from "./views/artist/artist";
import cart from "./views/cart/cart";

import disc from "./views/disc/disc";
import genre from "./views/genre/genre";
import home from "./views/home/home";
import login from "./views/login/login";
import signUp from "./views/signUp/signUp";
import clientDeliveryAdress from "./views/client-delivery-adress/client-delivery-adress";
import clientUserData from "./views/client-user-data/client-user-data";
import clientCreditCard from "./views/client-credit-card/client-credit-card";
import ClientPurchases from "./views/client-purchases/client-purchases";
import EmployeeRegistration from "./views/employee/EmployeeRegistration";
import Exchanges from "./views/exchanges/Exchanges";
import Pricing from "./views/pricing/Pricing";
import Stock from "./views/stock/Stock";
import Sale from "./views/sale/Sale";
import SaleAccept from "./views/sale/SaleAccept";
import PaymentAndAddress from "./views/payment-address/PaymentAndAddress";
import PurchasesControl from "./views/purchases-control/PurchasesControl";
import ClientCoupons from "./views/client-coupons/client-coupons";
import Recorder from "./views/recorder/recorder";
import Analysis from "./views/analysis/analysis";
import PromotionalCupon from "./views/PromotionalCupon/PromotionalCuponRegistration";

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
          <this.PublicRoute
            path="/artist"
            //authed={this.state.isLoggedIn}
            exact
            component={artist}
          />
          <this.PublicRoute
            path="/genres"
            //authed={this.state.isLoggedIn}
            exact
            component={genre}
          />
          <this.PublicRoute
            path="/disc"
            //authed={this.state.isLoggedIn}
            exact
            component={disc}
          />
          <this.PublicRoute
            path="/deliveryAddresses"
            //authed={this.state.isLoggedIn}
            exact
            component={clientDeliveryAdress}
          />
          <this.PublicRoute
            path="/myInfo"
            //authed={this.state.isLoggedIn}
            exact
            component={clientUserData}
          />
          <this.PublicRoute
            path="/creditCards"
            //authed={this.state.isLoggedIn}
            exact
            component={clientCreditCard}
          />
          <this.PublicRoute
            path="/myPurchases"
            //authed={this.state.isLoggedIn}
            exact
            component={ClientPurchases}
          />
          <this.PublicRoute
            path="/newEmployees"
            //authed={this.state.isLoggedIn}
            exact
            component={EmployeeRegistration}
          />
          <this.PublicRoute
            path="/exchangeManagement"
            //authed={this.state.isLoggedIn}
            exact
            component={Exchanges}
          />
          <this.PublicRoute
            path="/pricing"
            //authed={this.state.isLoggedIn}
            exact
            component={Pricing}
          />
          <this.PublicRoute
            path="/stock"
            //authed={this.state.isLoggedIn}
            exact
            component={Stock}
          />
          <this.PublicRoute
            path="/sale"
            //authed={this.state.isLoggedIn}
            exact
            component={Sale}
          />
          <this.PublicRoute
            path="/saleAccept"
            //authed={this.state.isLoggedIn}
            exact
            component={SaleAccept}
          />
          <this.PublicRoute
            path="/paymentAndAddress"
            //authed={this.state.isLoggedIn}
            exact
            component={PaymentAndAddress}
          />
          <this.PublicRoute
            path="/purchaseControl"
            //authed={this.state.isLoggedIn}
            exact
            component={PurchasesControl}
          />
          <this.PublicRoute
            path="/myCoupons"
            //authed={this.state.isLoggedIn}
            exact
            component={ClientCoupons}
          />
          <this.PublicRoute
            path="/recorder"
            //authed={this.state.isLoggedIn}
            exact
            component={Recorder}
          />
          <this.PublicRoute
            path="/analysis"
            //authed={this.state.isLoggedIn}
            exact
            component={Analysis}
          />
          <this.PublicRoute
            path="/promoCoupon"
            //authed={this.state.isLoggedIn}
            exact
            component={PromotionalCupon}
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
