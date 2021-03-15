import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";
import SSSelect from "../form/SSSelect";
import { apiGet } from "../../utils/api/api-utils";

export default class StockForm extends Component {
  render() {
    return (
      <Form.Row>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Data de compra"
            type="date"
            name={`${this.props.root}.purchaceDate`}
            value={this.props?.stock?.purchaceDate || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Custo da compra"
            name={`${this.props.root}.costPrice`}
            value={this.props?.stock?.costPrice || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Unidades compradas"
            name={`${this.props.root}.quantity`}
            value={this.props?.stock?.quantity || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
      </Form.Row>
    );
  }
}
