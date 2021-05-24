import clone from "clone";
import React, { Component } from "react";
import { Card, Col, Form, Image } from "react-bootstrap";
import { apiGet } from "../../utils/api/api-utils";
import ArtistTableForm from "../artist/ArtistTableForm";
import SSInput from "../form/SSInput";
import SSSelect from "../form/SSSelect";
import GenreTable from "../genre/genreTable";
import GenreTableForm from "../genre/GenreTableForm";

export default class DiscForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      recorders: [],
      prices: [],
    };
  }

  async componentDidMount() {
    await this.fetchArtists();
    await this.fetchRecorders();
    await this.fetchPrices();
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
  async fetchPrices() {
    try {
      let prices = await apiGet(process.env.REACT_APP_PRICING_ENDPOINT);
      this.setState({
        prices,
      });
    } catch (error) {
      this.props.handleErrorMessage(error);
    }
  }
  //className="align-self-center"
  render() {
    return (
      <>
        <Form.Row>
          <Form.Group as={Col} md={6}>
            <SSInput
              label="Nome do disco"
              name={`${this.props.root}.name`}
              value={this.props?.disc?.name || ""}
              onChange={this.props.onChange}
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <SSInput
              label="Capa do disco"
              name={`${this.props.root}.imgLink`}
              value={this.props?.disc?.imgLink || ""}
              onChange={this.props.onChange}
            />
          </Form.Group>

          <Form.Group as={Col} md={10}>
            <SSInput
              label="Descrição"
              as="textarea"
              style={{ minHeight: "110px" }}
              name={`${this.props.root}.description`}
              value={this.props?.disc?.description || ""}
              onChange={this.props.onChange}
            />
          </Form.Group>
          <Form.Group as={Col} md={2}>
            <Image
              src={this.props?.disc?.imgLink}
              style={{ height: "150px", width: "100%", objectFit: "cover" }}
              thumbnail
            />
          </Form.Group>

          <Form.Group as={Col} md={6}>
            <SSSelect
              label="Gravadora"
              name={`${this.props.root}.recorder.id`}
              items={this.state?.recorders.map((r) => {
                return { id: r.id, description: r.name };
              })}
              value={this.props?.disc?.recorder?.id || ""}
              onChange={this.props.onChange}
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <SSSelect
              label="Precificação"
              name={`${this.props.root}.pricing.id`}
              items={this.state?.prices}
              value={this.props?.disc?.pricing?.id || ""}
              onChange={this.props.onChange}
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <SSInput
              label="Data de lançamento"
              name={`${this.props.root}.releaseDate`}
              type="date"
              value={this.props?.disc?.releaseDate || ""}
              onChange={this.props.onChange}
            />
          </Form.Group>
        </Form.Row>
        {this.props.isUpdate && (
          <Form.Row>
            <Form.Group as={Col} md={6}>
              <SSSelect
                label="Status"
                name={`${this.props.root}.active`}
                items={[
                  { id: true, description: "Ativo" },
                  { id: false, description: "Inativo" },
                ]}
                value={this.props?.disc?.active || false}
                onChange={this.props.onChange}
              />
            </Form.Group>
            <Form.Group as={Col} md={6}>
              <SSInput
                label="Categoria"
                name={`${this.props.root}.activationDetails.category`}
                value={this.props?.disc?.activationDetails?.category || ""}
                onChange={this.props.onChange}
              />
            </Form.Group>
            <Form.Group as={Col} md={12}>
              <SSInput
                label="Motivo"
                as="textarea"
                name={`${this.props.root}.activationDetails.motive`}
                value={this.props?.disc?.activationDetails?.motive || ""}
                onChange={this.props.onChange}
              />
            </Form.Group>
          </Form.Row>
        )}
        <hr />

        <GenreTableForm
          genres={this.props.genres}
          removeGenre={this.props.removeGenre}
          addGenre={this.props.addGenre}
          handleErrorMessage={this.props.handleErrorMessage}
        />
        <hr />
        <ArtistTableForm
          artists={this.props.artists}
          removeArtist={this.props.removeArtist}
          addArtist={this.props.addArtist}
          handleErrorMessage={this.props.handleErrorMessage}
        />
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
