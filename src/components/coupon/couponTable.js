import React, { Component } from "react";
import SSTable from "../table/SSTable";

export default class CouponTable extends Component {
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
        dataField: "value",
        text: "Valor",
        events: rowEvents,
      },
      {
        dataField: "code",
        text: "Código",
        events: rowEvents,
      },
      {
        dataField: "active",
        text: "Ativo",
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return cell == true ? "SIM" : "NÂO";
        },
        events: rowEvents,
      },
      {
        dataField: "expirationDate",
        text: "Data de expiração",
        events: rowEvents,
      },
    ];
    return <SSTable data={this.props.data || []} columns={columns} />;
  }
}
