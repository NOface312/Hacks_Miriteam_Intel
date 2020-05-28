import React, { Component } from "react";
import Factory_Manager_Services from '../../../../services/factory_manager/factory_manager_services';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import jwt_decode from 'jwt-decode';

class Create_CNC_Modal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            area: [],
            workshop: "",
            name: "", 
            area_str: "",
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getallarea = this.getallarea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async getallarea() {
        try {
            const token = localStorage.getItem("access_token");
            var decoded = jwt_decode(token);
            var workshop = decoded.workshop;
            let response = await Factory_Manager_Services.get('/area/');
            console.log(response.data);
            let filter_data = [];
            for (let index = 0; index < response.data.length; index++) {
                if (response.data[index].workshop == workshop) {
                    filter_data.push(response.data[index]);
                }
            }
            this.setState({
                area: filter_data,
                workshop: workshop
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            if (this.state.area_str == "") {
                this.state.area_str = this.state.area[0].name;
            }
            const response = await Factory_Manager_Services.post('/cnc/', {
                name: this.state.name,
                area: this.state.area_str,
                workshop: this.state.workshop
            });
            this.setState({ show: false });
            location.reload();
            return response;
        } catch (error) {
            throw error;
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        this.getallarea();
    }

    render() {
        return (
            <>
                <button type="button" onClick={this.handleShow}>
                    Создать станок
                </button>
                <Modal show={this.state.show} onHide={this.handleClose} className="text-dark">
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить станок</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Название</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Введите название станка" value={this.state.name} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Выберите участок</Form.Label>
                                <Form.Control as="select" name="area_str" value={this.state.area_str} onChange={this.handleChange}>
                                    {this.state.area.map(are => <option value={are.name}> {are.name} </option>)}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


export default Create_CNC_Modal;