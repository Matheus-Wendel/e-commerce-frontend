import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";

export default class ArtistForm extends Component {
  render() {
    return (
      <Form.Row>
        <Form.Group as={Col} md={12}>
          <SSInput
            label="Nome do artista"
            name={`${this.props.root}.name`}
            value={this.props?.client?.name || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
      </Form.Row>
    );
  }
}
