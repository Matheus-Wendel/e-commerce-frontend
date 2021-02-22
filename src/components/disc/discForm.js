import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";
import SSSelect from "../form/SSSelect";

export default class DiscForm extends Component {
  render() {
    return (
      <Form.Row>
        <Form.Group as={Col} md={5}>
          <SSInput
            label="Nome do disco"
            name={`${this.props.root}.name`}
            value={this.props?.disc?.name || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={5}>
          <SSInput
            label="Capa do disco"
            name={`${this.props.root}.name`}
            value={this.props?.disc?.name || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={2}>
          <SSInput
            label="Data de lançamento"
            name={`${this.props.root}.telephone`}
            type="date"
            value={this.props?.disc?.telephone || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={12}>
          <SSInput
            label="Descrição"
            as="textarea"
            name={`${this.props.root}.description`}
            value={this.props?.disc?.description || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSSelect
            label="Generos"
            name={`${this.props.root}.genre`}
            items={[
              { code: 1, description: "Rock" },
              { code: 2, description: "Jazz" },
            ]}
            value={this.props?.disc?.genre || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
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
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSSelect
            label="Gravadora"
            name={`${this.props.root}.artists`}
            items={[
              { code: 1, description: "Sony records" },
              { code: 2, description: "WB's" },
            ]}
            value={this.props?.disc?.genre || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
      </Form.Row>
    );
  }
}
