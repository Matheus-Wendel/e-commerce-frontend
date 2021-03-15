import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";
import SSSelect from "../form/SSSelect";
import { apiGet } from "../../utils/api/api-utils";

export default class PricingForm extends Component {
  render() {
    return (
      <Form.Row>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Descrição"
            name={`${this.props.root}.description`}
            value={this.props?.pricing?.description || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>

        <Form.Group as={Col} md={4}>
          <SSInput
            label="Lucro padrão"
            type="range"
            min="1"
            max="500"
            step="1"
            name={`${this.props.root}.defautProfit`}
            value={this.props?.pricing?.defautProfit || ""}
            onChange={this.props.onChange}
          />
          <SSInput value={this.props?.pricing?.defautProfit || ""} disabled />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Lucro minimo"
            type="range"
            min="1"
            max="500"
            step="1"
            name={`${this.props.root}.minimumProfit`}
            value={this.props?.pricing?.minimumProfit || ""}
            onChange={this.props.onChange}
          />
          <SSInput value={this.props?.pricing?.minimumProfit || ""} disabled />
        </Form.Group>
      </Form.Row>
    );
  }
}
