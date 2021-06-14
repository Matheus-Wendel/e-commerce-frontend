import React, { Component } from "react";
import { srtGenerator } from "../../utils/utils";
import SSTable from "../table/SSTable";

export default class EmployeeTable extends Component {
  render() {
    const rowEvents = {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        this.props.onRowSelect(row);
      },
    };

    const columns = [
      {
        dataField: "id",
        text: "ID",
        events: rowEvents,
      },
      {
        dataField: "name",
        text: "Nome",
        events: rowEvents,
      },
      {
        dataField: "cpf",
        text: "CPF",
        events: rowEvents,
      },
      {
        dataField: "user.email",
        text: "Email",
        events: rowEvents,
      },
    ];
    return (
      <SSTable
        data={this.props.data || []}
        columns={columns}
        noDataIndication="Sem registros"
      />
    );
  }
}
