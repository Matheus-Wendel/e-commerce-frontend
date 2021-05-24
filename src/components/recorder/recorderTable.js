import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import SSTable from "../table/SSTable";

export default class RecorderTable extends Component {
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
        text: "Nome da gravadora",
        events: rowEvents,
      },
    ];
    return <SSTable data={this.props.data || []} columns={columns} />;
  }
}
