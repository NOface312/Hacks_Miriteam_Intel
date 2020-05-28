import React, { Component } from "react";
import Workshop_Services from '../../../../services/workshop/workshop_services';
import axiosInstance from '../../../../axios/axiosAPI'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import jwt_decode from 'jwt-decode';

class Create_Form_Modal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            boss_workshop: "",
            boss_area_str: "not",
            boss_area: [],
            comment: "",
            area_str: "",
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getallusers = this.getallusers.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async getallusers() {
        try {
            const token = localStorage.getItem("access_token");
            var decoded = jwt_decode(token);
            var workshop = decoded.workshop;
            let response = await axiosInstance.get('/user/');
            let filter_data = [];
            for (let index = 0; index < response.data.length; index++) {
                if (response.data[index].workshop == workshop && response.data[index].position == "Начальник участка") {
                    filter_data.push(response.data[index]);
                }
            }
            this.setState({
                boss_area: filter_data,
                workshop: workshop,
                boss_workshop: decoded.fio
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
            
            if (this.state.boss_area_str == "not") {
                this.state.boss_area_str = this.state.boss_area[0].FIO;
            }

            for (let index = 0; index < this.state.boss_area.length; index++) {
                if (this.state.boss_area[index].FIO == this.state.boss_area_str) {
                    this.state.area_str = this.state.boss_area[index].area;
                    break;
                }
            }

            const response = await Workshop_Services.post('/for_trouble/', {
                boss_workshop: this.state.boss_workshop,
                boss_area: this.state.boss_area_str,
                comment: this.state.comment,
                area: this.state.area_str,
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
        this.getallusers();
    }

    render() {
        return (
            <>
                <button type="button" onClick={this.handleShow}>
                    Создать документ/запрос
                </button>
                <Modal show={this.state.show} onHide={this.handleClose} className="text-dark">
                    <Modal.Header closeButton>
                        <Modal.Title>Создать документ/запрос</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Комментарий к документу</Form.Label>
                                <Form.Control name="comment" type="text" placeholder="Комментарий к документу" value={this.state.comment} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1" className="text-dark">
                                <Form.Label>Выберите адресата</Form.Label>
                                <Form.Control as="select" name="boss_area_str" value={this.state.boss_area_str} onChange={this.handleChange}>
                                    {this.state.boss_area.map(boss => <option value={boss.FIO}>{boss.FIO}</option>)}
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


export default Create_Form_Modal;