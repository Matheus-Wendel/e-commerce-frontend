import React, { Component } from "react";
import { srtGenerator } from "../../utils/utils";
import SSTable from "../table/SSTable";

export default class StockTable extends Component {
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
        dataField: "purchaceDate",
        text: "Data de compra",
        events: rowEvents,
      },
      {
        dataField: "costPrice",
        text: "Custo da compra",
        events: rowEvents,
      },
      {
        dataField: "quantity",
        text: "Unidades restantes",
        events: rowEvents,
      },
    ];
    return (
      <SSTable
        data={this.props.data || []}
        columns={columns}
        noDataIndication="Selecione um disco para visualizar seus registros de estoque"
      />
    );
  }
}
