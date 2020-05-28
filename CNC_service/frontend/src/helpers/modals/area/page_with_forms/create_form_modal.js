import React, { Component } from "react";
import Area_Services from '../../../../services/area/area_services';
import Factory_Manager_Services from '../../../../services/factory_manager/factory_manager_services';
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
            boss_area: "",
            boss_repair_str: "",
            boss_repair: [],
            comment: "",
            area_str: "",
            cnc: [],
            cnc_str: "",
            type: "",
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
                if (response.data[index].workshop == workshop && response.data[index].position == "Начальник ремонтной службы") {
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
                boss_repair: filter_data,
                area_str: decoded.area,
                boss_area: decoded.fio,
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
            
            if (this.state.boss_repair_str == "") {
                this.state.boss_repair_str = this.state.boss_repair[0].FIO;
            }
            if (this.state.cnc_str == "") {
                this.state.cnc_str = this.state.cnc[0].name;
            }
            if (this.state.type == "") {
                this.state.type = "Профилактика";
            }

            const response = await Area_Services.post('/for_b_repair/', {
                boss_repair: this.state.boss_repair_str,
                boss_area: this.state.boss_area,
                comment: this.state.comment,
                type_request: this.state.type,
                cnc: this.state.cnc_str,
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
                                <Form.Control as="select" name="boss_area_str" value={this.state.boss_repair_str} onChange={this.handleChange}>
                                    {this.state.boss_repair.map(boss => <option value={boss.FIO}>{boss.FIO}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect2" className="text-dark">
                                <Form.Label>Выберите станок</Form.Label>
                                <Form.Control as="select" name="cnc_str" value={this.state.cnc_str} onChange={this.handleChange}>
                                    {this.state.cnc.map(cn => <option value={cn.name}>{cn.name}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect3" className="text-dark">
                                <Form.Label>Выберите тип запроса</Form.Label>
                                <Form.Control as="select" name="type" value={this.state.type} onChange={this.handleChange}>
                                    <option value="Профилактика">Профилактика</option>
                                    <option value="Ремонт">Ремонт</option>
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