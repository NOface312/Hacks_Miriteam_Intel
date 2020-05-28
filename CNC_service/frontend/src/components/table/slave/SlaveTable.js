import React, { Component } from "react";
import {BootstrapTable, TableHeaderColumn} 
        from 'react-bootstrap-table'
import "../../../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css"
import "../css/Table.css"
import Change_Form_Modal from './../../../helpers/modals/worker/main/change_form_modal'


class SlaveTable extends Component {

    changeButton(cell, row, enumObject, rowIndex) {
      return (
        <Change_Form_Modal data={this.props.data[rowIndex]['pk']} />
      )
   }

  
   render() {
     return (
      <BootstrapTable data={this.props.data} className="table">
       <TableHeaderColumn dataField='pk' isKey className="head">
          Номер
        </TableHeaderColumn>
        <TableHeaderColumn dataField='date_request' className="head">
          Дата
        </TableHeaderColumn>
        <TableHeaderColumn dataField='boss_repair' className="head">
          Начальник
        </TableHeaderColumn>
        <TableHeaderColumn dataField='comment' className="head">
          Текст
        </TableHeaderColumn>
        <TableHeaderColumn dataField='cnc' className="head">
          Станок
        </TableHeaderColumn>
        <TableHeaderColumn dataField='status' className="head">
          Статус
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='button'
          dataFormat={this.changeButton.bind(this)}
          className="head"
        />
     </BootstrapTable>
    )
   }
  }
  

  export default SlaveTable;