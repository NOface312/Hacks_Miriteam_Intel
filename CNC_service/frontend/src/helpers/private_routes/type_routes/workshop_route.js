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
    if (position != "Начальник цеха") {
        props.history.push("/");
    }
    return true;
}

export const WorkshopRoute = ({ component: Component, ...rest }) => (
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