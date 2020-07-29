import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Login from "./Login";
import Content from "./content";
import IndexRedirect from "./IndexRedirect";

export default class Router extends React.Component{
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/main" component={Content}/>
                </Switch>
                <IndexRedirect/>
            </HashRouter>
        )
    }
};
