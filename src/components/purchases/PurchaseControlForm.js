import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import { getPurchaseStatus } from "../../utils/utils";
import SSInput from "../form/SSInput";

export default class PurchaseControlForm extends Component {
  render() {
    return (
      <Form.Row>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Data da compra"
            name={`${this.props.root}.purchaseDate`}
            value={this.props?.purchase?.purchaseDate || ""}
            disabled
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Valor da compra"
            name={`${this.props.root}.value`}
            value={this.props?.purchase?.value || ""}
            disabled
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="CNPJ do cliente"
            name={`${this.props.root}.client.cpf`}
            value={this.props?.purchase?.client?.cpf || ""}
            disabled
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Status da compra"
            name={`${this.props.root}.purchaseStatus`}
            value={
              getPurchaseStatus(this.props?.purchase?.purchaseStatus) || ""
            }
            disabled
          />
        </Form.Group>

        <Form.Group as={Col} md={6}>
          <SSInput
            label="Valor"
            name={`${this.props.root}.value`}
            value={this.props?.purchase?.value || ""}
            disabled
          />
        </Form.Group>
      </Form.Row>
    );
  }
}
