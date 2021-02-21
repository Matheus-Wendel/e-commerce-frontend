import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";
import SSSelect from "../form/SSSelect";

export default class AddressForm extends Component {
  render() {
    return (
      <Form.Row>
        <Form.Group as={Col} md={3}>
          <SSInput
            label="Nome Do endereco"
            name={`${this.props.root}.description`}
            placeholder="Casa, trabalho, etc..."
            value={this.props?.address?.description || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <SSInput
            label="Tipo do lougradouro"
            name={`${this.props.root}.addressType`}
            placeholder="Rua, praça, via etc..."
            value={this.props?.address?.addressType || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Lougradouro"
            name={`${this.props.root}.addressDescription`}
            value={this.props?.address?.addressDescription || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={2}>
          <SSInput
            label="Número"
            name={`${this.props.root}.number`}
            value={this.props?.address?.number || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Bairro"
            name={`${this.props.root}.district`}
            value={this.props?.address?.district || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>

        <Form.Group as={Col} md={4}>
          <SSSelect
            label="Estado"
            name={`${this.props.root}.state`}
            items={[
              { code: 1, description: "São Paulo" },
              { code: 2, description: "Amazonas" },
            ]}
            value={this.props?.client?.genre || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSSelect
            label="Cidade"
            name={`${this.props.root}.city`}
            items={[
              { code: 1, description: "Mogi das Cruzes" },
              { code: 2, description: "Arujá" },
            ]}
            value={this.props?.address?.city?.id || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Observações"
            name={`${this.props.root}.observations`}
            value={this.props?.address?.observations || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
      </Form.Row>
    );
  }
}
