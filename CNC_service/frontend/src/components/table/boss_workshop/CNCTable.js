import React, { Component } from "react";
import {BootstrapTable, TableHeaderColumn} 
        from 'react-bootstrap-table'
import "../../../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css"
import "../css/Table.css";
import Delete_CNC_Modal from './../../../helpers/modals/workshop/cnc_manager/delete_cnc_modal';
import Change_CNC_Modal from './../../../helpers/modals/workshop/cnc_manager/change_cnc_modal';


class CNCTable extends Component {

    changeButton(cell, row, enumObject, rowIndex) {
      return (
        <Change_CNC_Modal data={this.props.data[rowIndex]['pk']} />
      )
    }

    deleteButton(cell, row, enumObject, rowIndex) {
      return (
        <Delete_CNC_Modal data={this.props.data[rowIndex]['pk']} />
      )
    }
  
   render() {
     return (
      <BootstrapTable data={this.props.data} className="table">
       <TableHeaderColumn dataField='pk' isKey className="head">
          Номер
        </TableHeaderColumn>
        <TableHeaderColumn dataField='name' className="head">
          Имя
        </TableHeaderColumn>
        <TableHeaderColumn dataField='area' className="head">
          Участок
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
  

export default CNCTable;