import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { getPurchaseStatus } from "../../utils/utils";
import SSTable from "../table/SSTable";

export default class PurchaseTable extends Component {
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
        dataField: "purchaseDate",
        text: "Data de compra",
        events: rowEvents,
      },
      {
        dataField: "value",
        text: "Valor da compra",
        events: rowEvents,
      },
      {
        dataField: "purchaseStatus",
        text: "Status da compra",
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return getPurchaseStatus(cell);
        },
      },
    ];
    return <SSTable data={this.props.data || []} columns={columns} />;
  }
}
