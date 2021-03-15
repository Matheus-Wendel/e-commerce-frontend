import React, { Component } from "react";
import { srtGenerator } from "../../utils/utils";
import SSTable from "../table/SSTable";

export default class GenreTable extends Component {
  render() {
    const artists = [
      { id: 1, name: "Rock" },
      { id: 2, name: "Jazz" },
      { id: 3, name: "Eletronica" },
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
        text: "Nome do gênero",
      },
    ];
    return <SSTable data={artists} columns={columns} />;
  }
}
