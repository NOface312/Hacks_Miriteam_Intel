import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import axiosInstance from "./../../../axios/axiosAPI";
import Slave_Menu from "./../../../helpers/menus/slave_menu";
import SlaveTable from "../../table/slave/SlaveTable";
import Repair_Services from '../../../services/repair/repair_services';
import jwt_decode from 'jwt-decode';

class Slave_Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
        };
        this.getallrequests = this.getallrequests.bind(this);
    }

    async getallrequests() {
        try {
            const token = localStorage.getItem("access_token");
            var decoded = jwt_decode(token);
            var FIO = decoded.fio;
            let response = await Repair_Services.get('/for_repair/');
            let filter_data = [];
            console.log(response.data)
            for (let index = 0; index < response.data.length; index++) {
                if (response.data[index].worker == FIO) {
                    filter_data.push(response.data[index]);
                }
            }
            this.setState({
                requests: filter_data,
            });
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.getallrequests();
    }

    render() {
        return (
            <div>
                <Slave_Menu/>
                <SlaveTable data={this.state.requests}/>
            </div>
        )
    }
}

export default Slave_Main;