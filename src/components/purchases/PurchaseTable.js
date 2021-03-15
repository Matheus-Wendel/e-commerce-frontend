import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { srtGenerator } from "../../utils/utils";
import SSTable from "../table/SSTable";

export default class PurchaseTable extends Component {
  render() {
    const rowEvents = {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        this.props.onRowSelect(row);
      },
    };
    const purchases = [
      {
        id: 1,
        purchaseDate: "01/02/2021",
        value: 100,
        coupons: null,
        purchaseCards: null,
        purchaseItems: [
          {
            id: 1,
            status: "PROCESSANDO",
            disc: {
              id: 1,
              value: 50,
              description: "Melhor disco",
              releaseDate: "01/02/2000",
              name: "O disco",
            },
          },
        ],
        deliveryAddress: null,
      },
      {
        id: 2,
        purchaseDate: "05/03/2021",
        value: 200,
        coupons: null,
        purchaseCards: null,
        purchaseItems: [
          {
            id: 1,
            status: "EM TRANSITO",
            disc: {
              id: 1,
              value: 50,
              description: "Segundo melhor disco",
              releaseDate: "01/02/2001",
              name: "O segundo disco",
            },
          },
        ],
        deliveryAddress: null,
      },
    ];

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
    ];
    return <SSTable data={purchases} columns={columns} />;
  }
}
