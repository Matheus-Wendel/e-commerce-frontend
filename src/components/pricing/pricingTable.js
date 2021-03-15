import React, { Component } from "react";
import SSTable from "../table/SSTable";

export default class PricingTable extends Component {
  render() {
    const rowEvents = {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        this.props.onRowSelect(row);
      },
    };
    const pricing = [
      {
        id: 1,
        description: "Importados",
        defautProfit: "100%",
        minimumProfit: "80%",
      },
      {
        id: 2,
        description: "Vinis",
        defautProfit: "300%",
        minimumProfit: "100%",
      },
    ];
    const columns = [
      {
        dataField: "id",
        text: "ID",
        events: rowEvents,
      },
      {
        dataField: "description",
        text: "Nome do grupo",
        events: rowEvents,
      },
      {
        dataField: "defautProfit",
        text: "Lucro padrão",
        events: rowEvents,
      },
      {
        dataField: "minimumProfit",
        text: "Lucro minimo",
        events: rowEvents,
      },
    ];
    return <SSTable data={pricing} columns={columns} />;
  }
}
