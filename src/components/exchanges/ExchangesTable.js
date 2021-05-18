import React, { Component } from "react";
import { getTradeStatus } from "../../utils/utils";
import SSTable from "../table/SSTable";

export default class ExchangesTable extends Component {
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
        dataField: "client.cpf",
        text: "CPF do solicitante",
        events: rowEvents,
      },
      {
        dataField: "purchaseItem.disc.id",
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
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return getTradeStatus(cell);
        },
      },
    ];
    return <SSTable data={this.props.data} columns={columns} />;
  }
}
