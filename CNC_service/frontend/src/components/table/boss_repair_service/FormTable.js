import React, { Component } from "react";
import {BootstrapTable, TableHeaderColumn} 
        from 'react-bootstrap-table'
import "../../../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css"
import "../css/Table.css"
import Delete_Form_Modal from './../../../helpers/modals/repair/page_with_forms/delete_form_modal';
import Change_Form_Modal from './../../../helpers/modals/repair/page_with_forms/change_form_modal';


class FormTable extends Component {
    changeButton(cell, row, enumObject, rowIndex) {
      return (
         <Change_Form_Modal data={this.props.data[rowIndex]['pk']} />
      )
   }

   deleteButton(cell, row, enumObject, rowIndex) {
    return (
       <Delete_Form_Modal data={this.props.data[rowIndex]['pk']} />
    )
 }

  
   render() {
     return (
      <BootstrapTable data={this.props.data} className="table">
       <TableHeaderColumn dataField='pk' isKey className="head">
          Номер
        </TableHeaderColumn>
        <TableHeaderColumn dataField='boss_repair' className="head">
          Начальник ремотного участка
        </TableHeaderColumn>
        <TableHeaderColumn dataField='worker' className="head">
          Рабочий
        </TableHeaderColumn>
        <TableHeaderColumn dataField='status' className="head">
          Статус
        </TableHeaderColumn>
        <TableHeaderColumn dataField='comment' className="head">
          Текст
        </TableHeaderColumn>        
        <TableHeaderColumn dataField='date_request' className="head">
          Дата
        </TableHeaderColumn>
        <TableHeaderColumn dataField='cnc' className="head">
          Станок
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='button'
          dataFormat={this.changeButton.bind(this)}
          className="head"
        />
        <TableHeaderColumn
          dataField='button'
          dataFormat={this.deleteButton.bind(this)}
          className="head"
        />
     </BootstrapTable>
    )
   }
  }
  

  export default FormTable;