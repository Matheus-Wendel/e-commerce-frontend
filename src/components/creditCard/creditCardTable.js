import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import SSTable from "../table/SSTable";

export default class CreditCardTable extends Component {
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
        text: "Nome do titular",
        events: rowEvents,
      },
      {
        dataField: "expirationDate",
        text: "Validade",
        events: rowEvents,
      },
      {
        dataField: "cardBrand.description",
        text: "Bandeira",
        events: rowEvents,
      },
    ];
    return <SSTable data={this.props.data || []} columns={columns} />;
  }
}
