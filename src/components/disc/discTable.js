import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { srtGenerator } from "../../utils/utils";
import SSTable from "../table/SSTable";

export default class DiscTable extends Component {
  render() {
    const discs = [
      { id: 1, name: "Alive 2007", releaseDate: "01/01/2007", status: "ativo" },
      { id: 2, name: "GUZZLER EP", releaseDate: "01/01/2020", status: "ativo" },
      {
        id: 3,
        name: "A day in a Yellow Beat",
        releaseDate: "01/01/2000",
        status: "inativo",
      },
    ];

    for (let i = 4; i < 50; i++) {
      discs.push({
        id: i,
        name: srtGenerator(8),
        releaseDate: srtGenerator(4),
        status: srtGenerator(3),
      });
    }
    const columns = [
      {
        dataField: "id",
        text: "ID",
      },
      {
        dataField: "name",
        text: "Nome do disco",
      },
      {
        dataField: "releaseDate",
        text: "Data de lançamento",
      },
      {
        dataField: "status",
        text: "Status",
      },
    ];
    return <SSTable data={discs} columns={columns} />;
  }
}
