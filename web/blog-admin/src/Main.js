import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './Login'
import Register from "./Register";
import AdminIndex from "./pages/AdminIndex";
import {Provider} from 'react-redux';
import store from "./store";

function Main() {
    return (
        <Provider store={store}>
            <Router>
                <Route path="/web/login/" exact component={Login}/>
                <Route path="/web/register/" component={Register}/>
                <Route path="/web/index/" component={AdminIndex}/>
            </Router>
        </Provider>
    )
}

export default Main
