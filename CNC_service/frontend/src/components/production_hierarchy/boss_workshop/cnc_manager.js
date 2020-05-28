import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import axiosInstance from "./../../../axios/axiosAPI";
import Workshop_Menu from "./../../../helpers/menus/workshop_menu";
import CNCTable from "./../../table/boss_workshop/CNCTable";
import Factory_Manager_Services from './../../../services/factory_manager/factory_manager_services';
import Create_CNC_Modal from './../../../helpers/modals/workshop/cnc_manager/create_cnc_modal';
import jwt_decode from 'jwt-decode';

class Boss_Workshop_CNC_Manager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cnc: [],
        };
        this.getallcnc = this.getallcnc.bind(this);
    }

    async getallcnc() {
        try {
            const token = localStorage.getItem("access_token");
            var decoded = jwt_decode(token);
            var workshop = decoded.workshop;
            let response = await Factory_Manager_Services.get('/cnc/');
            console.log(response.data);
            let filter_data = [];
            for (let index = 0; index < response.data.length; index++) {
                if (response.data[index].workshop == workshop) {
                    filter_data.push(response.data[index]);
                }
            }
            this.setState({
                cnc: filter_data,
            });
        } catch (error) {
            console.log(error);
        }
    }


    componentDidMount() {
        this.getallcnc();
    }


    render() {

        return (
            <div>
                <Workshop_Menu />
                <Create_CNC_Modal />
                <CNCTable data={this.state.cnc} />
            </div>
        )
    }
}

export default Boss_Workshop_CNC_Manager;