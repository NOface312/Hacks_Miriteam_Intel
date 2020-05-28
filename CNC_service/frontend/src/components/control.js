import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import axiosInstance from "./../axios/axiosApi";

class Control extends Component {
    constructor(props) {
        super(props);
        this.state;
        this.handleLogout = this.handleLogout.bind(this)
    }

    async handleLogout() {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            return response;
        }
        catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <div>Здаров
                <button onClick={this.handleLogout}>Выйти</button>
            </div>
        )
    }
}

export default Control;