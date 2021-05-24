import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import React, { Component } from "react";
import { Badge, Button, Col, Form } from "react-bootstrap";
import { apiGet } from "../../utils/api/api-utils";
import SSInput from "../form/SSInput";
import GenreTable from "./genreTable";

export default class GenreTableForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      genreIsSelected: false,
      genreSelected: {},
      discGenreSelected: {},
      discGenreIsSelected: false,
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
      this.props.handleErrorMessage(error);
    }
  }
  handleSelectedRowGenres(row) {
    let selectedRow = clone(row);
    this.setState({
      genreSelected: selectedRow,
      genreIsSelected: true,
    });
  }
  handleSelectedRowDiscGenres(row) {
    let selectedRow = clone(row);
    this.setState({
      discGenreSelected: selectedRow,
      discGenreIsSelected: true,
    });
  }

  handleCleanSelectedGenres() {
    this.setState({
      genreSelected: {},
      genreIsSelected: false,
    });
  }
  handleCleanSelectedDiscGenres() {
    this.setState({
      discGenreSelected: {},
      discGenreIsSelected: false,
    });
  }

  handleAddGenreToDisc() {
    const { genreSelected } = this.state;
    let genres = this.props.genres;
    let exist = genres.find((item) => {
      return item.id === genreSelected.id;
    });
    if (exist) {
      let error = { message: "Genero ja adicionado ao disco" };
      this.props.handleErrorMessage(error);
      return;
    }
    this.props.addGenre(genreSelected);
    this.handleCleanSelectedGenres();
  }

  handleRemoveGenreFromDisc() {
    const { discGenreSelected } = this.state;

    let genres = this.props.genres;
    let filtered = genres.filter((item) => {
      return item.id !== discGenreSelected.id;
    });

    this.props.removeGenre(filtered);
    this.handleCleanSelectedDiscGenres();
  }
  render() {
    return (
      <>
        <h2>
          <Badge variant="secondary">Generos</Badge>
        </h2>
        <Form.Row>
          <Form.Group as={Col} md={6}>
            <h3>Gêneros do disco</h3>
            <GenreTable
              data={this.props.genres}
              onRowSelect={this.handleSelectedRowDiscGenres.bind(this)}
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <h3>Adicione gêneros</h3>
            <GenreTable
              data={this.state.genres}
              onRowSelect={this.handleSelectedRowGenres.bind(this)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md={3}>
            <SSInput
              label="Nome"
              name={`generoo`}
              value={this.state?.discGenreSelected?.name || ""}
              disabled={true}
            />
          </Form.Group>
          <Form.Group as={Col} md={3}>
            <SSInput
              label="Descrição"
              name={`generoo`}
              value={this.state?.discGenreSelected?.description || ""}
              disabled={true}
            />
          </Form.Group>
          <Form.Group as={Col} md={3}>
            <SSInput
              label="Nome"
              name={`generoo`}
              value={this.state?.genreSelected?.name || ""}
              disabled={true}
            />
          </Form.Group>
          <Form.Group as={Col} md={3}>
            <SSInput
              label="Descrição"
              name={`generoo`}
              value={this.state?.genreSelected?.description || ""}
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
              disabled={!this.state.discGenreIsSelected}
              onClick={this.handleRemoveGenreFromDisc.bind(this)}
            >
              <FontAwesomeIcon className="mr-2" icon={faTimes} />
              Remover do disco
            </Button>
          </Col>
          <Col md={3} className="offset-md-3">
            <Button
              className="mt-1 mb-0"
              type="submit"
              variant="primary"
              block
              disabled={!this.state.genreIsSelected}
              onClick={this.handleAddGenreToDisc.bind(this)}
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
              disabled={!this.state.genreIsSelected}
              onClick={this.handleCleanSelectedGenres.bind(this)}
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
