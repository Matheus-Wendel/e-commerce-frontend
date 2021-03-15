import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";
import SSSelect from "../form/SSSelect";
import { apiGet } from "../../utils/api/api-utils";

export default class PurchaseItemDevolutionForm extends Component {
  render() {
    return (
      <Form.Row>
        <Form.Group as={Col} md={6}>
          <SSInput
            label="Nome do disco"
            name={`${this.props.root}.name`}
            value={this.props?.disc?.name || ""}
            disabled
          />
        </Form.Group>

        <Form.Group as={Col} md={6}>
          <SSInput
            label="Valor"
            name={`${this.props.root}.value`}
            value={this.props?.disc?.value || ""}
            onChange={this.props.onChange}
            disabled
          />
        </Form.Group>
      </Form.Row>
    );
  }
}
