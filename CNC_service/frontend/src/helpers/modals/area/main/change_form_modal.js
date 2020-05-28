import React, { Component } from "react";
import Workshop_Services from '../../../../services/workshop/workshop_services';
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
            status: "",
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            const response1 = await Workshop_Services.get('/for_trouble/' + this.props.data);
            const response = await Workshop_Services.put('/for_trouble/' + this.props.data + '/', {
                status: this.state.status,
                boss_workshop: response1.data.boss_workshop,
                boss_area: response1.data.boss_area,
                comment: response1.data.comment,
                area: response1.data.area,
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
    }

    render() {
        return (
            <>
                <button type="button" onClick={this.handleShow}>
                    Изменить
                </button>
                <Modal show={this.state.show} onHide={this.handleClose} className="text-dark">
                    <Modal.Header closeButton>
                        <Modal.Title>Изменить станок</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect2" className="text-dark">
                                <Form.Label>Выберите статус</Form.Label>
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