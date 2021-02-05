import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import CreateWebsitePassword from "./CreateWebsitePassword";
import Login from "./Login";
import HomePage from "./HomePage";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            username: ''
          };
    }

    componentDidMount() {
        if (this.state.logged_in) {
          fetch('/accounts/current_user/', {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
          })
            .then(res => res.json())
            .then(json => {
              this.setState({ username: json.username });
            });
        }
      }



    handle_signup = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/core/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(json => {
            localStorage.setItem('token', json.token);
            this.setState({
              logged_in: true,
              displayed_form: '',
              username: json.username
            });
          });
      };
    
    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, username: '' });
      };


    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path='/create' component={CreateWebsitePassword}/>
                    <Route path='/login' component={Login}/>
                </Switch>
            </Router>
            )
    }
}


const appDiv = document.getElementById("app");
render(<App />, appDiv);