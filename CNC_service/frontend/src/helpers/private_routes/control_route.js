import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import jwt_decode from 'jwt-decode';


function Check_User(props) {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        return false;
    }
    var decoded = jwt_decode(token);
    var position = decoded.position
    switch (position) {
        case "Начальник цеха":
            props.history.push("/workshop/home/");
            break;
        case "Начальник участка":
            props.history.push("/area/home/");
            break;
        case "Начальник ремонтной службы":
            props.history.push("/repair/home/");
            break;
        case "Работник":
            props.history.push("/worker/home/");
            break;
        default:
            console.log("error"); 
    }
    return true;
}

export const ControlRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Check_User(props) ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login/",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);