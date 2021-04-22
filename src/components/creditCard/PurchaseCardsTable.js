import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import SSTable from "../table/SSTable";

export default class PurchaseCardsTable extends Component {
  render() {
    const rowEvents = {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        this.props.onRowSelect(row);
      },
    };
    const columns = [
      {
        dataField: "creditCard.id",
        text: "ID",
        events: rowEvents,
      },
      {
        dataField: "value",
        text: "Valor nesse cartão",
        events: rowEvents,
      },
      {
        dataField: "creditCard.expirationDate",
        text: "Validade",
        events: rowEvents,
      },
      {
        dataField: "creditCard.cardBrand.description",
        text: "Bandeira",
        events: rowEvents,
      },
    ];
    return <SSTable data={this.props.data || []} columns={columns} />;
  }
}
