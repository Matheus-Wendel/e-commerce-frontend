import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";
import SSSelect from "../form/SSSelect";

export default class PromotionalCouponRegistrationForm extends Component {
  render() {
    return (
      <Form.Row>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Código do cupon"
            name={`${this.props.root}.code`}
            value={this.props?.coupon?.code || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Valor"
            name={`${this.props.root}.value`}
            value={this.props?.coupon?.value || ""}
            onChange={this.props.onChange}
            disabled={this.props.isUpdate}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Valido até"
            type="date"
            name={`${this.props.root}.expirationDate`}
            value={this.props?.coupon?.expirationDate || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={6}>
          <SSSelect
            label="Ativo"
            name={`${this.props.root}.active`}
            items={[
              { id: "true", description: "Ativo" },
              { id: "false", description: "Inativo" },
            ]}
            value={this.props?.coupon?.active}
            onChange={this.props.onChange}
          />
        </Form.Group>
      </Form.Row>
    );
  }
}
