import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSForm from "../../components/form/SSForm";
import ArtistForm from "../../components/artist/artistForm";
import SSFormLayout from "../../layout/SSFormLayout";
import ArtistTable from "../../components/artist/artistTable";
import {
  alertMessageUtil,
  handleErrorMessage,
  handleSetAlert,
  updateStateValue,
} from "../../utils/utils";
import { apiDelete, apiGet, apiPost, apiPut } from "../../utils/api/api-utils";
import clone from "clone";
import SSAlert from "../../components/alert/SSalert";

export default class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      artists: [],
      artist: {
        name: "",
      },
      isUpdate: false,
    };
  }
  async componentDidMount() {
    await this.fetchArtists();
  }
  async fetchArtists() {
    try {
      let artists = await apiGet(process.env.REACT_APP_ARTIST_ENDPOINT);

      this.setState({
        artists,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const { artist, isUpdate } = this.state;
      if (isUpdate) {
        await apiPut(process.env.REACT_APP_ARTIST_ENDPOINT, artist);
        handleSetAlert(
          this.setState.bind(this),
          ["Artista atualizado com sucesso"],
          "sucesso",
          "success"
        );
      } else {
        await apiPost(process.env.REACT_APP_ARTIST_ENDPOINT, artist);
        handleSetAlert(
          this.setState.bind(this),
          ["Artista cadastrado com sucesso"],
          "sucesso",
          "success"
        );
      }
      this.handleClear();
      await this.fetchArtists();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleDelete() {
    try {
      const { artist } = this.state;

      await apiDelete(process.env.REACT_APP_ARTIST_ENDPOINT, artist.id);
      handleSetAlert(
        this.setState.bind(this),
        ["Artista excluido com sucesso"],
        "sucesso",
        "success"
      );

      this.handleClear();
      await this.fetchArtists();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  handleSelectedRow(row) {
    let selectedRow = clone(row);

    console.log(selectedRow);
    this.setState({
      isUpdate: true,
      artist: selectedRow,
    });
  }
  handleClear() {
    this.setState({
      isUpdate: false,
      artist: {},
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
            Cadastro de artistas
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
            <ArtistForm
              root="artist"
              artist={this.state.artist}
              onChange={this.handleInputChange.bind(this)}
            />
            <hr />
          </SSForm>
          <hr />
          <h3>Artistas cadastrados</h3>
          <ArtistTable
            data={this.state.artists}
            onRowSelect={this.handleSelectedRow.bind(this)}
          />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
