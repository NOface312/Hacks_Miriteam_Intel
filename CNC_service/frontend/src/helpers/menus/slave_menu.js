import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import axiosInstance from "./../../axios/axiosAPI";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Table } from 'react-bootstrap';

class Slave_Menu extends React.Component {
    constructor() {
        super();
        this.state;
        this.handleLogout = this.handleLogout.bind(this)
    }

    async handleLogout(event) {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            location.reload();
            return response;
        }
        catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <Navbar expand="lg" variant="dark" bg="dark">
                <Navbar.Brand href="#home">CNC_Service</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/worker/home/">Главная</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button variant="outline-success" onClick={this.handleLogout}>Выйти</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


export default Slave_Menu;