import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";
import SSSelect from "../form/SSSelect";
import { apiGet } from "../../utils/api/api-utils";
import { formatPercentageValue } from "../../utils/utils";

export default class SaleForm extends Component {
  render() {
    return (
      <>
        <Form.Row>
          <Form.Group as={Col} md={4}>
            <SSInput
              label="Margem de lucro promocional"
              type="range"
              min="0.01"
              max="5"
              step="0.01"
              name={`${this.props.root}.profit`}
              value={this.props?.sale?.profit || ""}
              onChange={this.props.onChange}
              disabled={this.props.disabled}
            />
            <SSInput
              value={formatPercentageValue(this.props?.sale?.profit || 0) || ""}
              disabled
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md={5}>
            <SSSelect
              label="Status"
              name={`${this.props.root}.status`}
              items={[
                { id: "ACTIVE", description: "Ativa" },
                { id: "INACTIVE", description: "Inativa" },
              ]}
              value={this.props?.sale?.status || ""}
              onChange={this.props.onChange}
              disabled={this.props.disabled}
            />
          </Form.Group>
        </Form.Row>
      </>
    );
  }
}
