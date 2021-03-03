import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";
import SSSelect from "../form/SSSelect";
import { apiGet } from "../../utils/api/api-utils";

export default class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      states: [],
    };
  }

  async componentDidMount() {
    let states = await apiGet(process.env.REACT_APP_STATE_ENDPOINT);

    this.setState({
      states,
    });
  }

  async handlefilterCities() {
    if (!this.props?.address.state.id) {
      this.setState({
        cities: [],
      });
      return;
    }

    let cities = await apiGet(process.env.REACT_APP_CITY_ENDPOINT, {
      state: this.props?.address.state.id,
    });
    this.setState({
      cities,
    });
  }

  render() {
    return (
      <Form.Row>
        <Form.Group as={Col} md={3}>
          <SSInput
            label="Nome Do endereco"
            name={`${this.props.root}.description`}
            placeholder="Casa, trabalho, etc..."
            value={this.props?.address?.description || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <SSInput
            label="Tipo do lougradouro"
            name={`${this.props.root}.addressType`}
            placeholder="Rua, praça, via etc..."
            value={this.props?.address?.addressType || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Lougradouro"
            name={`${this.props.root}.addressDescription`}
            value={this.props?.address?.addressDescription || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={2}>
          <SSInput
            label="Número"
            name={`${this.props.root}.number`}
            value={this.props?.address?.number || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Bairro"
            name={`${this.props.root}.district`}
            value={this.props?.address?.district || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>

        <Form.Group as={Col} md={4}>
          <SSSelect
            label="Estado"
            name={`${this.props.root}.state.id`}
            items={this.state.states}
            value={this.props?.address?.state?.id || ""}
            onChange={(event) => {
              this.props.onChange(event);
              this.handlefilterCities();
            }}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSSelect
            label="Cidade"
            name={`${this.props.root}.city.id`}
            items={this.state.cities}
            value={this.props?.address?.city?.id || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Observações"
            name={`${this.props.root}.observations`}
            value={this.props?.address?.observations || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
      </Form.Row>
    );
  }
}
