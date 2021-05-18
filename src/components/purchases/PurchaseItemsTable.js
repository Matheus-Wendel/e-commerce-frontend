import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { getTradeStatus } from "../../utils/utils";
import SSTable from "../table/SSTable";

export default class PurchaseItemsTable extends Component {
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
        dataField: "disc.name",
        text: "Nome do disco",

        events: rowEvents,
      },
      {
        dataField: "value",
        text: "Preço do disco",

        events: rowEvents,
      },
      {
        dataField: "trade.status",
        text: "Status de troca",
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return getTradeStatus(cell);
        },
        events: rowEvents,
      },
    ];
    return (
      <SSTable
        data={this.props.data || []}
        columns={columns}
        noDataIndication="Selecione uma compra para carregar seus itens."
      />
    );
  }
}
