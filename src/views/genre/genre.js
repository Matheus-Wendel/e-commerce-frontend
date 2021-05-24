import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSForm from "../../components/form/SSForm";

import SSFormLayout from "../../layout/SSFormLayout";
import {
  alertMessageUtil,
  handleErrorMessage,
  handleSetAlert,
  updateStateValue,
} from "../../utils/utils";
import { apiDelete, apiGet, apiPost, apiPut } from "../../utils/api/api-utils";
import clone from "clone";
import SSAlert from "../../components/alert/SSalert";
import GenreForm from "../../components/genre/genreForm";
import GenreTable from "../../components/genre/genreTable";

export default class Genres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      genres: [],
      genre: {
        name: "",
      },
      isUpdate: false,
    };
  }
  async componentDidMount() {
    await this.fetchGenres();
  }
  async fetchGenres() {
    try {
      let genres = await apiGet(process.env.REACT_APP_GENRE_ENDPOINT);

      this.setState({
        genres,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const { genre, isUpdate } = this.state;
      if (isUpdate) {
        await apiPut(process.env.REACT_APP_GENRE_ENDPOINT, genre);
        handleSetAlert(
          this.setState.bind(this),
          ["Gênero atualizado com sucesso"],
          "sucesso",
          "success"
        );
      } else {
        await apiPost(process.env.REACT_APP_GENRE_ENDPOINT, genre);
        handleSetAlert(
          this.setState.bind(this),
          ["Gênero cadastrado com sucesso"],
          "sucesso",
          "success"
        );
      }
      this.handleClear();
      await this.fetchGenres();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleDelete() {
    try {
      const { genre } = this.state;

      await apiDelete(process.env.REACT_APP_GENRE_ENDPOINT, genre.id);
      handleSetAlert(
        this.setState.bind(this),
        ["Gênero excluido com sucesso"],
        "sucesso",
        "success"
      );

      this.handleClear();
      await this.fetchGenres();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  handleSelectedRow(row) {
    let selectedRow = clone(row);

    console.log(selectedRow);
    this.setState({
      isUpdate: true,
      genre: selectedRow,
    });
  }
  handleClear() {
    this.setState({
      isUpdate: false,
      genre: {},
    });
  }
  async handleInputChange(event) {
    const target = event.target;
    let { name, value } = target;
    const updated = updateStateValue(this.state, name, value);
    await this.setState({
      updated,
    });
  }
  render() {
    return (
      <SSFormLayout>
        <Card.Body>
          <Card.Title as="h1">
            <FontAwesomeIcon icon={faCompactDisc} spin className="mr-2" />
            Cadastro de gêneros musicais
          </Card.Title>
          <SSAlert
            showAlert={this.state.alert.show}
            messages={this.state.alert.messages}
            variant={this.state.alert.variant}
            title={this.state.alert.title}
          />
          <hr />

          <SSForm
            onSubmit={this.handleSubmit.bind(this)}
            onCancel={this.handleClear.bind(this)}
            onDelete={this.handleDelete.bind(this)}
            allowDelete={this.state.isUpdate}
            customSubmitText={this.state.isUpdate ? "Atualizar" : ""}
          >
            <GenreForm
              root="genre"
              genre={this.state.genre}
              onChange={this.handleInputChange.bind(this)}
            />
            <hr />
          </SSForm>
          <hr />
          <h3>Generos musicais cadastrados</h3>
          <GenreTable
            data={this.state.genres}
            onRowSelect={this.handleSelectedRow.bind(this)}
          />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
