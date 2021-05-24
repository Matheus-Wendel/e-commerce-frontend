import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSAlert from "../../components/alert/SSalert";
import DiscForm from "../../components/disc/discForm";
import DiscTable from "../../components/disc/discTable";
import SSForm from "../../components/form/SSForm";
import SSFormLayout from "../../layout/SSFormLayout";
import { apiDelete, apiGet, apiPost, apiPut } from "../../utils/api/api-utils";
import {
  alertMessageUtil,
  handleErrorMessage,
  handleSetAlert,
  updateStateValue,
} from "../../utils/utils";
import DiscModel from "./discModel";

export default class Disc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      discs: [],
      genres: [],
      artists: [],
      disc: new DiscModel(),
      isUpdate: false,
    };
  }
  async componentDidMount() {
    await this.fetchDiscs();
  }
  async fetchDiscs() {
    try {
      let discs = await apiGet(process.env.REACT_APP_DISC_ENDPOINT);
      console.log(discs);
      this.setState({
        discs,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const { disc, isUpdate } = this.state;
      if (isUpdate) {
        await apiPut(process.env.REACT_APP_DISC_ENDPOINT, disc);
        handleSetAlert(
          this.setState.bind(this),
          ["Disco atualizado com sucesso"],
          "sucesso",
          "success"
        );
      } else {
        await apiPost(process.env.REACT_APP_DISC_ENDPOINT, disc);
        handleSetAlert(
          this.setState.bind(this),
          ["Disco cadastrado com sucesso"],
          "sucesso",
          "success"
        );
      }
      this.handleClear();
      await this.fetchDiscs();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleDelete() {
    try {
      const { disc } = this.state;

      await apiDelete(process.env.REACT_APP_DISC_ENDPOINT, disc.id);
      handleSetAlert(
        this.setState.bind(this),
        ["Disco excluido com sucesso"],
        "sucesso",
        "success"
      );

      this.handleClear();
      await this.fetchDiscs();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  handleSelectedRow(row) {
    let selectedRow = clone(row);

    console.log(selectedRow);
    this.setState({
      isUpdate: true,
      disc: selectedRow,
    });
  }
  handleClear() {
    this.setState({
      isUpdate: false,
      disc: new DiscModel(),
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
  handleAddGenre(genre) {
    let disc = clone(this.state.disc);
    disc.genres.push(genre);
    this.setState({ disc });
  }
  handleRemoveGenre(filteredList) {
    let disc = clone(this.state.disc);
    disc.genres = filteredList;
    this.setState({ disc });
  }
  handleAddArtist(artist) {
    let disc = clone(this.state.disc);
    disc.artists.push(artist);
    this.setState({ disc });
  }
  handleRemoveArtist(filteredList) {
    let disc = clone(this.state.disc);
    disc.artists = filteredList;
    this.setState({ disc });
  }
  render() {
    return (
      <SSFormLayout>
        <Card.Body>
          <Card.Title as="h1">
            <FontAwesomeIcon icon={faCompactDisc} spin className="mr-2" />
            Cadastro de discos
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
          >
            <DiscForm
              handleErrorMessage={(error) => {
                handleErrorMessage(this.setState.bind(this), error);
              }}
              onChange={this.handleInputChange.bind(this)}
              disc={this.state.disc}
              root="disc"
              genres={this.state.disc.genres || []}
              artists={this.state.disc.artists || []}
              addGenre={this.handleAddGenre.bind(this)}
              removeGenre={this.handleRemoveGenre.bind(this)}
              addArtist={this.handleAddArtist.bind(this)}
              removeArtist={this.handleRemoveArtist.bind(this)}
              isUpdate={this.state.isUpdate}
            />
            <hr />
          </SSForm>
          <hr />
          <h3>Discos cadastrados</h3>
          <DiscTable
            data={this.state.discs}
            onRowSelect={this.handleSelectedRow.bind(this)}
          />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
