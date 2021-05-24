import React, { Component } from "react";
import { formatPercentageValue } from "../../utils/utils";
import SSTable from "../table/SSTable";

export default class PricingTable extends Component {
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
        text: "Nome do grupo",
        events: rowEvents,
      },
      {
        dataField: "defautProfit",
        text: "Lucro padrão",
        events: rowEvents,
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return formatPercentageValue(cell);
        },
      },
      {
        dataField: "minimumProfit",
        text: "Lucro minimo",
        events: rowEvents,
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return formatPercentageValue(cell);
        },
      },
    ];
    return <SSTable data={this.props.data || []} columns={columns} />;
  }
}
