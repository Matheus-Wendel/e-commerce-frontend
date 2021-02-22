import React, { Component } from "react";
import Form from "react-bootstrap/Form";

export default class SSInput extends Component {
  render() {
    return (
      <Form.Group>
        {this.props.label && (
          <Form.Label>
            {this.props.required ? `${this.props.label} *` : this.props.label}
          </Form.Label>
        )}
        <Form.Control {...this.props} className="form-control-sm" />
        <Form.Control.Feedback type="invalid">
          campo obrigatório
        </Form.Control.Feedback>
        {this.props.debug && `Value: ${this.props.value}`}
      </Form.Group>
    );
  }
}
