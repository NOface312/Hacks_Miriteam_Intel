import React, { Component } from "react";
import axiosInstance from "./../../axios/axiosApi";
import { Redirect, Route, Link } from "react-router-dom";
import "./css/login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmitWThen(event) {
        event.preventDefault();
        axiosInstance.post('/token/obtain/', {
            username: this.state.username,
            password: this.state.password
        }).then(
            result => {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                localStorage.setItem('access_token', result.data.access);
                localStorage.setItem('refresh_token', result.data.refresh);
            }
        ).catch(error => {
            throw error;
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            });
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            this.props.history.push("/");
            return response;
        } catch (error) {
            throw error;
        }
    }

    render() {
        return (
            <div className="simple-login-container">
                <form className="form" onSubmit={this.handleSubmit}>
                    <h2>Войти</h2>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="username" type="text" className="form-control" placeholder="Логин" value={this.state.username} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="password" type="password" placeholder="Пароль" className="form-control" value={this.state.password} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input type="submit" className="btn btn-block btn-login"/>
                        </div>
                    </div>
                    <div className="row">
                        <label>Нет учётной записи?</label>
                        <div className="col-md-12">
                            <Link to="/signup/">Регистрация</Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default Login;