import "../../static/css/styles.css";

import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import CreateWebsitePassword from "./CreateWebsitePassword";
import Login from "./Login";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import SignUp from "./SignUp";
import WebsitePasswordList from "./WebsitePasswordList";


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
            isLoggedIn: localStorage.getItem('token') ? true : false,
            username: ''
          };
        this.setLogin = this.setLogin.bind(this);
    }

    // componentDidMount() {
    //     if (this.state.logged_in) {
    //       fetch('/accounts/current_user/', {
    //         headers: {
    //           Authorization: `JWT ${localStorage.getItem('token')}`
    //         }
    //       })
    //         .then(res => res.json())
    //         .then(json => {
    //           this.setState({ username: json.username });
    //         });
    //     }
    //   }

    setLogin = () => {
        this.setState({ 
            isLoggedIn: localStorage.getItem('token') ? true : false,
            username: ''
        })
    }

    render() {
        return (
            <Router>
                <Navbar isLoggedIn={this.state.isLoggedIn} setLogin={this.setLogin}/>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <DecisionRoute path='/create' trueComponent={CreateWebsitePassword} falseComponent={HomePage} decisionFunc={ () => this.state.isLoggedIn}/>
                    <DecisionRoute path='/list' trueComponent={WebsitePasswordList} falseComponent={HomePage} decisionFunc={ () => this.state.isLoggedIn}/>
                    <Route path='/login' render={(props) => <Login {...props} setLogin={this.setLogin} />}/>
                    <Route path='/signup' component={SignUp}/>
                </Switch>
            </Router>
            )
    }
}


const appDiv = document.getElementById("app");
render(<App />, appDiv);