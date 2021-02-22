import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { srtGenerator } from "../../utils/utils";
import SSTable from "../table/SSTable";

export default class ArtistTable extends Component {
  render() {
    const artists = [
      { id: 1, name: "Tim maia" },
      { id: 2, name: "Ramones" },
      { id: 3, name: "Windows96" },
    ];

    for (let i = 4; i < 50; i++) {
      artists.push({ id: i, name: srtGenerator(8) });
    }
    const columns = [
      {
        dataField: "id",
        text: "ID",
      },
      {
        dataField: "name",
        text: "Nome do artista",
      },
    ];
    return <SSTable data={artists} columns={columns} />;
  }
}
