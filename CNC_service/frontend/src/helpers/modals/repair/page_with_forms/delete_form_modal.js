import React, { Component } from "react";
import Repair_Services from '../../../../services/repair/repair_services';
import Factory_Manager_Services from '../../../../services/factory_manager/factory_manager_services';
import axiosInstance from '../../../../axios/axiosAPI'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import jwt_decode from 'jwt-decode';

class Delete_Form_Modal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            const response = await Repair_Services.delete('/for_repair/' + this.props.data);
            location.reload();
            return response;
        } catch (error) {
            throw error;
        }
    }

    render() {
        return (
            <>
                <button type="button" onClick={this.handleShow}>
                    Удалить
                </button>
                <Modal show={this.state.show} onHide={this.handleClose} className="text-dark">
                    <Modal.Header closeButton>
                        <Modal.Title>Создать документ/запрос</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Вы уверенны что хотите удалить запрос/документ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Удалить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


export default Delete_Form_Modal;