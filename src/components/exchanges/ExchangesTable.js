import React, { Component } from "react";
import SSTable from "../table/SSTable";

export default class ExchangesTable extends Component {
  render() {
    const rowEvents = {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        this.props.onRowSelect(row);
      },
    };
    const requests = [
      {
        id: 1,
        client: { cpf: "111.111.111-11" },
        disc: { id: 1 },
        requestDate: "01/01/2021",
        status: "EM TROCA",
      },
      {
        id: 2,
        client: { cpf: "222.222.222-22" },
        disc: { id: 2 },
        requestDate: "01/01/2021",
        status: "EM TROCA",
      },
    ];

    const columns = [
      {
        dataField: "id",
        text: "ID",
        events: rowEvents,
      },
      {
        dataField: "client.cpf",
        text: "CPF do solicitante",
        events: rowEvents,
      },
      {
        dataField: "disc.id",
        text: "Id do disco",
        events: rowEvents,
      },
      {
        dataField: "requestDate",
        text: "Data de solicitação",
        events: rowEvents,
      },
      {
        dataField: "status",
        text: "Status da solicitação",
        events: rowEvents,
      },
    ];
    return <SSTable data={requests} columns={columns} />;
  }
}
