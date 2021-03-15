import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";
import SSSelect from "../form/SSSelect";
import { apiGet } from "../../utils/api/api-utils";

export default class SaleForm extends Component {
  render() {
    return (
      <>
        <Form.Row>
          <Form.Group as={Col} md={4}>
            <SSInput
              label="Margem de lucro promocional"
              type="range"
              min="1"
              max="500"
              step="1"
              name={`${this.props.root}.profit`}
              value={this.props?.sale?.profit || ""}
              onChange={this.props.onChange}
            />
            <SSInput value={this.props?.sale?.profit || ""} disabled />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md={5}>
            <SSSelect
              label="Status"
              name={`${this.props.root}.genre`}
              items={[
                { id: "ACTIVE", description: "Ativa" },
                { id: "INACTIVE", description: "Inativa" },
              ]}
              value={this.props?.client?.genre || ""}
              onChange={this.props.onChange}
            />
          </Form.Group>
        </Form.Row>
      </>
    );
  }
}
