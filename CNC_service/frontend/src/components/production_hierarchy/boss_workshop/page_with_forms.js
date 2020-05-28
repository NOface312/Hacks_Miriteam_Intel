import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import axiosInstance from "./../../../axios/axiosAPI";
import Workshop_Menu from "./../../../helpers/menus/workshop_menu";
import DocumentTable from "../../table/boss_workshop/DocumentTable";
import Workshop_Services from './../../../services/workshop/workshop_services';
import Create_Form_Modal from '../../../helpers/modals/workshop/page_with_forms/create_form_modal';
import jwt_decode from 'jwt-decode';

class Boss_Workshop_Page_With_Forms extends Component {
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
                if (response.data[index].boss_workshop == FIO) {
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
                <Workshop_Menu /><br/>
                <Create_Form_Modal />
                <DocumentTable data={this.state.requests} />
            </div>
        )
    }
}
export default Boss_Workshop_Page_With_Forms;