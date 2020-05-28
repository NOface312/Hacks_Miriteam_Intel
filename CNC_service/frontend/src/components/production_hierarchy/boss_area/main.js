import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Area_Menu from "./../../../helpers/menus/area_menu";
import MainTable from "../../table/boss_area/MainTable";
import axiosInstance from "./../../../axios/axiosAPI";
import Workshop_Services from './../../../services/workshop/workshop_services';
import jwt_decode from 'jwt-decode';

class Boss_Area_Main extends Component {
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
            let response = await Workshop_Services.get('/for_trouble/');
            let filter_data = [];
            for (let index = 0; index < response.data.length; index++) {
                if (response.data[index].boss_area == FIO) {
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
                <Area_Menu/>
                <MainTable data={this.state.requests}/>
            </div>
        )
    }
}

export default Boss_Area_Main;