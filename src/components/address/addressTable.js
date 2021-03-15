import React, { Component } from "react";
import SSTable from "../table/SSTable";

export default class AddressTable extends Component {
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
        dataField: "description",
        text: "Nome do endereço",
        events: rowEvents,
      },
    ];
    return <SSTable data={this.props.data || []} columns={columns} />;
  }
}
