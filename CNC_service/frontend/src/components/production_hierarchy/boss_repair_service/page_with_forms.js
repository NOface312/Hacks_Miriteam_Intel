import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import axiosInstance from "./../../../axios/axiosAPI";
import Repair_Menu from "./../../../helpers/menus/repair_menu";
import FormTable from "../../table/boss_repair_service/FormTable"
import Create_Form_Modal from './../../../helpers/modals/repair/page_with_forms/create_form_modal'
import Repair_Services from '../../../services/repair/repair_services';
import jwt_decode from 'jwt-decode';

class Boss_Repair_Service_Page_With_Forms extends Component {
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
                <Create_Form_Modal />
                <FormTable data={this.state.requests}/>
            </div>
        )
    }
}

export default Boss_Repair_Service_Page_With_Forms;