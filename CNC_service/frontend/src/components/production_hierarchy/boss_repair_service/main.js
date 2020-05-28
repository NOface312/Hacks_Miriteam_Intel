import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import axiosInstance from "./../../../axios/axiosAPI";
import Repair_Menu from "./../../../helpers/menus/repair_menu";
import MainTable from "../../table/boss_repair_service/MainTable";
import Area_Services from './../../../services/area/area_services';
import jwt_decode from 'jwt-decode';



class Boss_Repair_Service_Main extends Component {
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
            let response = await Area_Services.get('/for_b_repair/');
            let filter_data = [];
            for (let index = 0; index < response.data.length; index++) {
                if (response.data[index].boss_repair == FIO) {
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
                <Repair_Menu/>
                <MainTable data={this.state.requests}/>
            </div>
        )
    }
}

export default Boss_Repair_Service_Main;