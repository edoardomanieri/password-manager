import "../../static/css/styles.css";

import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CreateWebsitePassword from "./CreateWebsitePassword";
import Login from "./Login";
import SignUp from "./SignUp";
import AppNavBar from "./AppNavBar";
import WebsitePasswordList from "./WebsitePasswordList";
import WebsitePasswordDetail from "./WebsitePasswordDetail";
import HeroBanner from "./HeroBanner";


const DecisionRoute = ( {trueComponent, falseComponent, decisionFunc, ...rest} ) => {
    return (
      <Route
        {...rest}
        component={ decisionFunc() ? trueComponent : falseComponent }
      />
    )
  }

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: localStorage.getItem('token') ? true : false
          };
        this.setLogin = this.setLogin.bind(this);
    }

    setLogin = () => {
        this.setState({ 
            isLoggedIn: localStorage.getItem('token') ? true : false
        })
    }

    render() {
        return (
            <Router>
                <AppNavBar isLoggedIn={this.state.isLoggedIn} setLogin={this.setLogin}/>
                <Switch>
                    <Route exact path="/" render={(props) => <HeroBanner {...props} isLoggedIn={this.state.isLoggedIn} />}/>
                    <Route path='/create' component={CreateWebsitePassword} />
                    <Route path='/list'>
                    {this.state.isLoggedIn ? <WebsitePasswordList /> : <Redirect to="/login"/>}
                    </Route>
                    <Route path='/login' render={(props) => <Login {...props} setLogin={this.setLogin} />}/>
                    <Route path='/signup' render={(props) => <SignUp {...props} setLogin={this.setLogin} />}/>
                    <Route path='/:user/:website_name' component={WebsitePasswordDetail}/>
                </Switch>
            </Router>
            )
    }
}


const appDiv = document.getElementById("app");
render(<App />, appDiv);