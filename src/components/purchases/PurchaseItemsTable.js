import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import SSTable from "../table/SSTable";

export default class PurchaseItemsTable extends Component {
  render() {
    const columns = [
      {
        dataField: "id",
        text: "ID",
      },
      {
        dataField: "status",
        text: "Status do item",
      },
      {
        dataField: "disc.name",
        text: "Nome do disco",
      },
      {
        dataField: "disc.value",
        text: "Preço do disco",
      },
    ];
    return (
      <SSTable
        data={this.props.data || []}
        columns={columns}
        noDataIndication="Selecione uma compra para carregar seus itens."
      />
    );
  }
}
