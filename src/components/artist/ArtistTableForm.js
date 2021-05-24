import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import React, { Component } from "react";
import { Badge, Button, Col, Form } from "react-bootstrap";
import { apiGet } from "../../utils/api/api-utils";
import SSInput from "../form/SSInput";
import ArtistTable from "./artistTable";

export default class ArtistTableForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      artistIsSelected: false,
      artistSelected: {},
      discArtistSelected: {},
      discArtistIsSelected: false,
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
      this.props.handleErrorMessage(error);
    }
  }
  handleSelectedRowArtists(row) {
    let selectedRow = clone(row);
    this.setState({
      artistSelected: selectedRow,
      artistIsSelected: true,
    });
  }
  handleSelectedRowDiscArtists(row) {
    let selectedRow = clone(row);
    this.setState({
      discArtistSelected: selectedRow,
      discArtistIsSelected: true,
    });
  }

  handleCleanSelectedArtists() {
    this.setState({
      artistSelected: {},
      artistIsSelected: false,
    });
  }
  handleCleanSelectedDiscArtists() {
    this.setState({
      discArtistSelected: {},
      discArtistIsSelected: false,
    });
  }

  handleAddArtistToDisc() {
    const { artistSelected } = this.state;
    let artists = this.props.artists;
    let exist = artists.find((item) => {
      return item.id === artistSelected.id;
    });
    if (exist) {
      let error = { message: "Artista ja adicionado ao disco" };
      this.props.handleErrorMessage(error);
      return;
    }
    this.props.addArtist(artistSelected);
    this.handleCleanSelectedArtists();
  }

  handleRemoveArtistFromDisc() {
    const { discArtistSelected } = this.state;

    let artists = this.props.artists;
    let filtered = artists.filter((item) => {
      return item.id !== discArtistSelected.id;
    });

    this.props.removeArtist(filtered);
    this.handleCleanSelectedDiscArtists();
  }
  render() {
    return (
      <>
        <h2>
          <Badge variant="secondary">Artistas</Badge>
        </h2>
        <Form.Row>
          <Form.Group as={Col} md={6}>
            <h3>Artistas do disco</h3>
            <ArtistTable
              data={this.props.artists}
              onRowSelect={this.handleSelectedRowDiscArtists.bind(this)}
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <h3>Adicione artistas</h3>
            <ArtistTable
              data={this.state.artists}
              onRowSelect={this.handleSelectedRowArtists.bind(this)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md={6}>
            <SSInput
              label="Nome"
              name={`nome`}
              value={this.state?.discArtistSelected?.name || ""}
              disabled={true}
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <SSInput
              label="Nome"
              name={`nome`}
              value={this.state?.artistSelected?.name || ""}
              disabled={true}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Col md={3} className="mb-4 ">
            <Button
              className="mt-1 mb-0"
              type="submit"
              variant="primary"
              block
              disabled={!this.state.discArtistIsSelected}
              onClick={this.handleRemoveArtistFromDisc.bind(this)}
            >
              <FontAwesomeIcon className="mr-2" icon={faTimes} />
              Remover do disco
            </Button>
          </Col>

          <Col md={3} className="offset-md-3">
            <Button
              className="mt-1 mb-0  "
              type="submit"
              variant="primary"
              block
              disabled={!this.state.artistIsSelected}
              onClick={this.handleAddArtistToDisc.bind(this)}
            >
              <FontAwesomeIcon className="mr-2" icon={faPlus} />
              Adicionar
            </Button>
          </Col>
          <Col md={3} className="">
            <Button
              className="mt-1 mb-0"
              type="submit"
              variant="primary"
              block
              disabled={!this.state.artistIsSelected}
              onClick={this.handleCleanSelectedArtists.bind(this)}
            >
              <FontAwesomeIcon className="mr-2" icon={faTimes} />
              Cancelar
            </Button>
          </Col>
        </Form.Row>
      </>
    );
  }
}
