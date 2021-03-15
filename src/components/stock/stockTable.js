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
    const stocks = [
      {
        id: 1,
        quantity: 50,
        costPrice: 600.0,
        purchaceDate: "10/01/2019",
      },
      {
        id: 1,
        quantity: 22,
        costPrice: 300.0,
        purchaceDate: "10/01/2020",
      },
    ];
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
        text: "Unidades compradas",
        events: rowEvents,
      },
    ];
    return (
      <SSTable
        data={[]}
        columns={columns}
        noDataIndication="Selecione um disco para visualizar seus registros de estoque"
      />
    );
  }
}
