import React, { Component } from "react";
import {BootstrapTable, TableHeaderColumn} 
        from 'react-bootstrap-table'
import "../../../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css"
import "../css/Table.css";
import Delete_Form_Modal from './../../../helpers/modals/workshop/page_with_forms/delete_form_modal'
import Change_Form_Modal from './../../../helpers/modals/workshop/page_with_forms/change_form_modal'



class DocumentTable extends Component {

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
        <TableHeaderColumn dataField='area' className="head">
          Участок
        </TableHeaderColumn>
        <TableHeaderColumn dataField='boss_area' className="head">
          Кому
        </TableHeaderColumn>
         <TableHeaderColumn dataField='date_request' className="head">
          Дата
        </TableHeaderColumn>
        <TableHeaderColumn dataField='comment' className="head">
          Текст
        </TableHeaderColumn>
        <TableHeaderColumn dataField='status' className="head">
          Статус
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
  

  export default DocumentTable;