import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import axiosInstance from "./../../../axios/axiosAPI";
import Workshop_Menu from "./../../../helpers/menus/workshop_menu";
import LineChart from "../../charts/linechart";
import jwt_decode from 'jwt-decode';
import Factory_Manager_Services from './../../../services/factory_manager/factory_manager_services';
import "../css/animation.css"

class Boss_Workshop_Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.getallcnc = this.getallcnc.bind(this);
    }

    async getallcnc() {
        try {
            const token = localStorage.getItem("access_token");
            var decoded = jwt_decode(token);
            var workshop = decoded.workshop;
            let response = await Factory_Manager_Services.get('/cnc/');
            let filter_data = [];
            for (let index = 0; index < response.data.length; index++) {
                if (response.data[index].workshop == workshop) {
                    filter_data.push(response.data[index]);
                }
            }
            return filter_data
        } catch (error) {
            console.log(error);
        }
    }

    async getData() {
        let data = [];
        let pushed = await this.getallcnc();
        for (let i = 0; i < pushed.length; i++) {
            const element = pushed[i];
            data.push(
                {
                    title: element['name'],
                    data: []
                }
            )
        }
        let iter = 0;
        let id = setInterval(async () => {
            pushed = await this.getallcnc();
            for (let i = 0; i < pushed.length; i++) {
                const element = pushed[i];
                data[i].data.push({
                    time: new Date(element['date']*1000),
                    value: element['congestion']
                });
            };
            iter = iter + 1;
        
            if(iter == 30){            
            this.setState({
                data: data
            });
                clearInterval(id);
            }
          }, 10000)
          
    }

    componentDidMount() {
        // It's not the most straightforward thing to run an async method in componentDidMount

        // Version 1 - no async: Console.log will output something undefined.
        this.getData();
        window.setInterval(() => {this.getData()}, 400000);
        

    }
    render() {
        let charts = []
        this.state['data'].forEach(data => {
            console.log(data)
            charts.push(
                <div className="main chart-wrapper">
                    <LineChart
                        data={data.data}
                        title={data.title}
                        color="#3E517A"
                    />
                </div>
            )
        })
        if (charts.length == 0){
            charts.push(
                <div>
                    <div className="text">Данные загружаются, пожалуйста, подождите</div>
                    <div class="thecube">
                        <div class="cube c1"></div>
                        <div class="cube c2"></div>
                        <div class="cube c4"></div>
                        <div class="cube c3"></div>
                    </div>
                </div>
            )
        }
        return (
            <div>
              <Workshop_Menu/>
                <div className="Charts">
                    {charts}
                </div>
            </div>
        )
    }
}
export default Boss_Workshop_Main;