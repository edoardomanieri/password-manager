import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import CreateWebsitePassword from "./CreateWebsitePassword";
import Login from "./Login";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        // render automatically when modify with states

    }

    render(){
        return (
        <Router>
            <Switch>
                <Route exact path="/"><p>Home page</p></Route>
                <Route path='/create' component={CreateWebsitePassword}/>
                <Route path='/login' component={Login}/>
            </Switch>
        </Router>
        )
    }
}