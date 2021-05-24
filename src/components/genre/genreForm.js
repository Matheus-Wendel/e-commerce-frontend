import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";

export default class GenreForm extends Component {
  render() {
    return (
      <Form.Row>
        <Form.Group as={Col} md={12}>
          <SSInput
            label="Nome do genero"
            name={`${this.props.root}.name`}
            value={this.props?.genre?.name || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={12}>
          <SSInput
            label="Descrição do genero"
            as="textarea"
            name={`${this.props.root}.description`}
            value={this.props?.genre?.description || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
      </Form.Row>
    );
  }
}
