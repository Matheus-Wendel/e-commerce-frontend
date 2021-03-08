import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";
import SSSelect from "../form/SSSelect";
import { apiGet } from "../../utils/api/api-utils";

export default class CreditCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardBrands: [],
    };
  }

  async componentDidMount() {
    let cardBrands = await apiGet(process.env.REACT_APP_CARD_BRAND_ENDPOINT);

    this.setState({
      cardBrands,
    });
  }

  render() {
    return (
      <Form.Row>
        <Form.Group as={Col} md={5}>
          <SSInput
            label="Nome do titular"
            name={`${this.props.root}.name`}
            value={this.props?.creditCard?.name || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>

        <Form.Group as={Col} md={4}>
          <SSInput
            label="Numero"
            name={`${this.props.root}.number`}
            value={this.props?.creditCard?.number || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <SSInput
            label="CVV"
            name={`${this.props.root}.cvv`}
            value={this.props?.creditCard?.cvv || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Data de Validade"
            type="month"
            name={`${this.props.root}.expirationDate`}
            value={this.props?.creditCard?.expirationDate || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>

        <Form.Group as={Col} md={4}>
          <SSSelect
            label="Bandeira do cartão"
            name={`${this.props.root}.cardBrand.id`}
            items={this.state.cardBrands}
            value={this.props?.creditCard?.cardBrand?.id || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
      </Form.Row>
    );
  }
}
