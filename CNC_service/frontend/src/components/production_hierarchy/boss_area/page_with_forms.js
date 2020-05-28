import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import axiosInstance from "./../../../axios/axiosAPI";
import Area_Menu from "./../../../helpers/menus/area_menu";
import DocumentTable from "../../table/boss_area/DocumentTable"
import Create_Form_Modal from './../../../helpers/modals/area/page_with_forms/create_form_modal'
import Area_Services from '../../../services/area/area_services';
import jwt_decode from 'jwt-decode';


class Boss_Area_Page_With_Forms extends Component {
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
                <Create_Form_Modal />
                <DocumentTable data={this.state.requests} />
            </div>
        )
    }
}

export default Boss_Area_Page_With_Forms;