import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";
import SSSelect from "../form/SSSelect";

export default class SignUpForm extends Component {
  render() {
    return (
      <Form.Row>
        <Form.Group as={Col} md={5}>
          <SSInput
            label="Nome completo"
            name={`${this.props.root}.name`}
            value={this.props?.client?.name || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <SSInput
            label="CPF"
            name={`${this.props.root}.cpf`}
            value={this.props?.client?.cpf || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={2}>
          <SSInput
            label="Telefone"
            name={`${this.props.root}.telephone`}
            type="password"
            value={this.props?.client?.telephone || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={2}>
          <SSSelect
            label="Sexo"
            name={`${this.props.root}.genre`}
            items={[
              { code: 1, description: "Masculino" },
              { code: 2, description: "Feminino" },
            ]}
            value={this.props?.client?.genre || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>

        <Form.Group as={Col} md={6}>
          <SSInput
            label="Email"
            name={`${this.props.root}.user.email`}
            value={this.props?.client?.user?.email || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Senha"
            name={`${this.props.root}.user.password`}
            type="password"
            value={this.props?.client?.user?.password || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
      </Form.Row>
    );
  }
}
