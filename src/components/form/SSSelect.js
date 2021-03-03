import React, { Component } from "react";
import Form from "react-bootstrap/Form";

export default class SSSelect extends Component {
  render() {
    return (
      <Form.Group>
        {this.props.label && (
          <Form.Label>
            {this.props.required ? `${this.props.label} *` : this.props.label}
          </Form.Label>
        )}
        <Form.Control
          as="select"
          onChange={this.props.onChange}
          className="form-control-sm"
          name={this.props.name}
        >
          <option value="">{this.props.placeholder || "Selecione..."}</option>
          {this.props.items.length &&
            this.props.items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          campo obrigatório
        </Form.Control.Feedback>
        {this.props.debug && `Value: ${this.props.value}`}
      </Form.Group>
    );
  }
}
