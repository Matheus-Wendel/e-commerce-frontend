import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { apiGet } from "../../utils/api/api-utils";
import { getAuthInfo } from "../../utils/utils";
import SSInput from "../form/SSInput";
import SSSelect from "../form/SSSelect";

export default class DiscSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      recorders: [],
      prices: [],
      genres: [],
      authInfo: getAuthInfo(),
    };
  }

  async componentDidMount() {
    await this.fetchArtists();
    await this.fetchGenres();
    await this.fetchRecorders();
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

  async fetchRecorders() {
    try {
      let recorders = await apiGet(process.env.REACT_APP_RECORDER_ENDPOINT);

      this.setState({
        recorders,
      });
    } catch (error) {
      this.props.handleErrorMessage(error);
    }
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

  //className="align-self-center"
  render() {
    const { authInfo } = this.state;
    return (
      <>
        <Form.Row>
          <Form.Group as={Col} md={4}>
            <SSInput
              placeholder="Nome do disco"
              name={`${this.props.root}.name`}
              value={this.props?.disc?.name || ""}
              onChange={this.props.onChange}
            />
          </Form.Group>

          <Form.Group as={Col} md={5}>
            <SSInput
              placeholder="Descrição"
              name={`${this.props.root}.description`}
              value={this.props?.disc?.description || ""}
              onChange={this.props.onChange}
            />
          </Form.Group>

          <Form.Group as={Col} md={3}>
            <SSSelect
              placeholder="Gravadora"
              name={`${this.props.root}.recorder`}
              items={this.state?.recorders.map((r) => {
                return { id: r.id, description: r.name };
              })}
              value={this.props?.disc?.recorder || ""}
              onChange={this.props.onChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row className="d-flex align-items-baseline">
          <Form.Group as={Col} md={3} className="mb-0">
            <SSSelect
              placeholder="Artista"
              name={`${this.props.root}.artist`}
              items={this.state?.artists.map((r) => {
                return { id: r.id, description: r.name };
              })}
              value={this.props?.disc?.artist || ""}
              onChange={this.props.onChange}
            />
          </Form.Group>
          <Form.Group as={Col} md={3} className="mb-0">
            <SSSelect
              placeholder="Gênero"
              name={`${this.props.root}.genre`}
              items={this.state?.genres.map((r) => {
                return { id: r.id, description: r.name };
              })}
              value={this.props?.disc?.genre || ""}
              onChange={this.props.onChange}
            />
          </Form.Group>
          {authInfo?.Permission === "EMPLOYEE" && (
            <Form.Group as={Col} md={4}>
              <SSSelect
                placeholder="Status"
                name={`${this.props.root}.active`}
                items={[
                  { id: true, description: "Ativo" },
                  { id: false, description: "Inativo" },
                ]}
                value={this.props?.disc?.active || ""}
                onChange={this.props.onChange}
              />
            </Form.Group>
          )}
          <Col md={3}>
            <Button
              type="submit"
              variant="secondary"
              block
              onClick={this.props.onSubmit.bind(this)}
            >
              <FontAwesomeIcon className="mr-2" icon={faSearch} />
              Buscar Discos
            </Button>
          </Col>
          <Col md={3}>
            <Button
              type="submit"
              variant="dark"
              block
              onClick={this.props.onCancel}
            >
              <FontAwesomeIcon className="mr-2" icon={faTimes} />
              Limpar pesquisa
            </Button>
          </Col>
        </Form.Row>

        {/* <Form.Group as={Col} md={4}>
          <SSSelect
          label="Artistas"
          name={`${this.props.root}.artists`}
          items={[
              { code: 1, description: "Yellow days" },
              { code: 2, description: "Cuco" },
            ]}
            value={this.props?.disc?.genre || ""}
            onChange={this.props.onChange}
            />
        </Form.Group> */}
      </>
    );
  }
}
