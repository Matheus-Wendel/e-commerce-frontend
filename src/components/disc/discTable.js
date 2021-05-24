import React, { Component } from "react";
import SSTable from "../table/SSTable";

export default class DiscTable extends Component {
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
        text: "Nome do disco",
        events: rowEvents,
      },
      {
        dataField: "releaseDate",
        text: "Data de lançamento",
        events: rowEvents,
      },
      {
        dataField: "active",
        text: "Ativo",
        events: rowEvents,
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return cell == true ? "SIM" : "NÂO";
        },
      },
    ];
    return <SSTable data={this.props.data || []} columns={columns} />;
  }
}
