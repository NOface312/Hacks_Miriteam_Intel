import React, { Component } from "react";
import Repair_Services from '../../../../services/repair/repair_services';
import Factory_Manager_Services from '../../../../services/factory_manager/factory_manager_services';
import axiosInstance from '../../../../axios/axiosAPI'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import jwt_decode from 'jwt-decode';


class Change_Form_Modal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            boss_repair: "",
            worker_str: "",
            worker: [],
            comment: "",
            cnc: [],
            cnc_str: "",
            status: "",
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
                if (response.data[index].workshop == workshop && response.data[index].position == "Работник") {
                    filter_data.push(response.data[index]);
                }
            }
            let filter_data1 = [];
            let response1 = await Factory_Manager_Services.get('/cnc/');
            for (let index = 0; index < response1.data.length; index++) {
                if (response1.data[index].workshop == workshop) {
                    filter_data1.push(response1.data[index]);
                }
            }
            this.setState({
                worker: filter_data,
                boss_repair: decoded.fio,
                cnc: filter_data1,
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

            if (this.state.worker_str == "") {
                this.state.worker_str = this.state.worker[0].FIO;
            }
            if (this.state.cnc_str == "") {
                this.state.cnc_str = this.state.cnc[0].name;
            }
            if (this.state.status == "") {
                this.state.status = "Выполнено";
            }

            const response = await Repair_Services.put('/for_repair/' + this.props.data + '/', {
                boss_repair: this.state.boss_repair,
                worker: this.state.worker_str,
                comment: this.state.comment,
                cnc: this.state.cnc_str,
                status: this.state.status,
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
                    Изменить документ/запрос
                </button>
                <Modal show={this.state.show} onHide={this.handleClose} className="text-dark">
                    <Modal.Header closeButton>
                        <Modal.Title>Изменить документ/запрос</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Комментарий к документу</Form.Label>
                                <Form.Control name="comment" type="text" placeholder="Комментарий к документу" value={this.state.comment} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1" className="text-dark">
                                <Form.Label>Выберите адресата</Form.Label>
                                <Form.Control as="select" name="worker_str" value={this.state.worker_str} onChange={this.handleChange}>
                                    {this.state.worker.map(boss => <option value={boss.FIO}>{boss.FIO}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect2" className="text-dark">
                                <Form.Label>Выберите станок</Form.Label>
                                <Form.Control as="select" name="cnc_str" value={this.state.cnc_str} onChange={this.handleChange}>
                                    {this.state.cnc.map(cn => <option value={cn.name}>{cn.name}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect3" className="text-dark">
                                <Form.Label>Выберите статус запроса</Form.Label>
                                <Form.Control as="select" name="status" value={this.state.status} onChange={this.handleChange}>
                                    <option value="Выполнено">Выполнено</option>
                                    <option value="Выполняется">Выполняется</option>
                                    <option value="Выполнить невозможно">Выполнить невозможно</option>
                                    <option value="Отправлено">Отправлено</option>
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


export default Change_Form_Modal;