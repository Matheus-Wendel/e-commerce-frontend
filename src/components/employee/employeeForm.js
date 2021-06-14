import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import SSInput from "../form/SSInput";
import SSSelect from "../form/SSSelect";

export default class EmployeeForm extends Component {
  render() {
    return (
      <>
        <Form.Row>
          <Form.Group as={Col} md={4} sm={12}>
            <SSInput
              label="Nome completo"
              name={`${this.props.root}.name`}
              value={this.props?.employee?.name || ""}
              disabled={this.props?.disabled}
              onChange={this.props.onChange}
            />
          </Form.Group>
          <Form.Group as={Col} md={4}>
            <SSInput
              label="CPF"
              name={`${this.props.root}.cpf`}
              value={this.props?.employee?.cpf || ""}
              disabled={this.props?.disabled}
              onChange={this.props.onChange}
            />
          </Form.Group>
          <Form.Group as={Col} md={4}>
            <SSInput
              label="Email"
              name={`${this.props.root}.user.email`}
              value={this.props?.employee?.user?.email || ""}
              disabled={this.props?.disabled}
              onChange={this.props.onChange}
            />
          </Form.Group>
          <Form.Group as={Col} md={4}>
            <SSInput
              label="Senha"
              name={`${this.props.root}.user.password`}
              type="password"
              value={this.props?.employee?.user?.password || ""}
              disabled={this.props?.disabled}
              onChange={this.props.onChange}
            />
          </Form.Group>
          <Form.Group as={Col} md={4}>
            <SSInput
              label="Confirmação de senha"
              name={`${this.props.root}.user.passwordConfirmation`}
              type="password"
              value={this.props?.employee?.user?.passwordConfirmation || ""}
              disabled={this.props?.disabled}
              onChange={this.props.onChange}
            />
          </Form.Group>
          {this.props.isUpdate && (
            <Form.Group as={Col} md={4}>
              <SSSelect
                label="Status"
                name={`${this.props.root}.user.active`}
                items={[
                  { id: true, description: "Ativo" },
                  { id: false, description: "Inativo" },
                ]}
                value={this.props?.employee?.user?.active || false}
                onChange={this.props.onChange}
                disabled={this.props?.disabled}
              />
            </Form.Group>
          )}
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md={5}>
            <SSSelect
              label="Tipo de cadastro"
              name={`${this.props.root}.user.permission`}
              items={[
                { id: "EMPLOYEE", description: "Funcionario" },
                { id: "SALES_MANAGER", description: "Gerente de vendas" },
              ]}
              value={this.props?.employee?.user?.permission || ""}
              disabled={this.props?.disabled}
              onChange={this.props.onChange}
            />
          </Form.Group>
        </Form.Row>
      </>
    );
  }
}
