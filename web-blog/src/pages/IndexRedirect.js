import React from "react";
import {Redirect} from 'react-router';
import '../config'

export default class IndexRedirect extends React.Component{
    render() {
        if(!global.constructor.token){
            return(
                <Redirect push to="/main"/>
            )
        }else{
            return(
                <Redirect push to="/login"/>
            )
        }
    }
}