import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";

export default class RecorderForm extends Component {
  render() {
    return (
      <Form.Row>
        <Form.Group as={Col} md={12}>
          <SSInput
            label="Nome da gravadora"
            name={`${this.props.root}.name`}
            value={this.props?.recorder?.name || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
      </Form.Row>
    );
  }
}
