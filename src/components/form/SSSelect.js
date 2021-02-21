import React, { Component } from "react";
import Form from "react-bootstrap/Form";

export default class SSSelect extends Component {
  render() {
    return (
      <Form.Group>
        {this.props.label && (
          <Form.Label {...this.props}>
            {this.props.required ? `${this.props.label} *` : this.props.label}
          </Form.Label>
        )}
        <Form.Control as="select" className="form-control-sm">
          <option value="">{this.props.placeholder || "Selecione..."}</option>
          {this.props.items.length &&
            this.props.items.map((item) => (
              <option key={item.code} value={item.code}>
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
