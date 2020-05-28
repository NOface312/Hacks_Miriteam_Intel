import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Factory_Manager_Services from "../../services/factory_manager/factory_manager_services";
import axios from 'axios';

class API_Test extends Component {
    constructor(props) {
        super(props);
        this.state = { pk: "", name: "" };
        this.getallworkshop = this.getallworkshop.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.getworkshop = this.getworkshop.bind(this); 
        this.createworkshop = this.createworkshop.bind(this);
        this.deleteworkshop = this.deleteworkshop.bind(this);
        this.updateworkshop = this.updateworkshop.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    async getallworkshop() {
        try {
            let response = await Factory_Manager_Services.get('/workshop/');
            console.log(response.data);
        } catch (error) {
            console.log("Hello error: ", JSON.stringify(error, null, 4));
            // throw error; todo
        }
    }

    async getworkshop(event) {
        event.preventDefault();
        try {
            const response = await Factory_Manager_Services.get('/workshop/' + this.state.pk);
            console.log(response.data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async createworkshop(event) {
        event.preventDefault();
        try {
            const response = await Factory_Manager_Services.post('/workshop/', {
                name: this.state.name,
            });
            console.log(response.data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteworkshop(event) {
        event.preventDefault();
        try {
            const response = await Factory_Manager_Services.delete('/workshop/' + this.state.pk);
            console.log(response.data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateworkshop(event) {
        event.preventDefault();
        try {
            const response = await Factory_Manager_Services.put('/workshop/' + this.state.pk + '/', {
                name: this.state.name,
            });
            console.log(response.data);
            return response;
        } catch (error) {
            throw error;
        }
    }


    render() {
        return (
            <div>Здаров
                <button onClick={this.getallworkshop}>Получить все мастерские</button>
                <p>---------------------------</p>
                <form className="form" onSubmit={this.getworkshop}>
                    <h2>Получить мастерскую</h2>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="pk" type="text" className="form-control" placeholder="pk" value={this.state.pk} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input type="submit" className="btn " />
                        </div>
                    </div>
                </form>
                <p>---------------------------</p>
                <form className="form" onSubmit={this.createworkshop}>
                    <h2>Создать мастерскую</h2>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="name" type="text" className="form-control" placeholder="name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input type="submit" className="btn " />
                        </div>
                    </div>
                </form>
                <p>---------------------------</p>
                <form className="form" onSubmit={this.deleteworkshop}>
                    <h2>Удалить мастерскую</h2>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="pk" type="text" className="form-control" placeholder="pk" value={this.state.pk} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input type="submit" className="btn " />
                        </div>
                    </div>
                </form>
                <p>---------------------------</p>
                <form className="form" onSubmit={this.updateworkshop}>
                    <h2>Изменить мастерскую</h2>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="pk" type="text" className="form-control" placeholder="pk" value={this.state.pk} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="name" type="text" className="form-control" placeholder="name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input type="submit" className="btn " />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default API_Test;