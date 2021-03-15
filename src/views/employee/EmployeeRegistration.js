import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import clone from "clone";

import AddressForm from "../../components/address/addressForm";
import SignUpForm from "../../components/client/signUpForm";
import SSForm from "../../components/form/SSForm";
import { updateStateValue } from "../../utils/utils";
import SignUpModel from "./EmployeeModel";
import { apiPost } from "../../utils/api/api-utils";
import SSalert from "../../components/alert/SSalert";
import Employee from "./EmployeeModel";
import SSFormLayout from "../../layout/SSFormLayout";
import SSSelect from "../../components/form/SSSelect";

export default class EmployeeRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: new Employee(),
      formError: "",
      showAlert: false,
      errorMessages: [],
    };
  }
  async handleSubimit(event) {
    event.preventDefault();
    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
      this.setState(() => ({
        formError: "true",
      }));
      return;
    }
    this.setState(() => ({
      formError: "false",
    }));

    const client = clone(this.state.client);
    let deliveryAddress = [client.deliveryAddresses];
    client.deliveryAddresses = deliveryAddress;
    try {
      await apiPost(process.env.REACT_APP_CLIENT_ENDPOINT, client);

      window.location.href = "/login?status=cadastro";
    } catch (error) {
      if (error.response?.data?.error) {
        this.setState(() => ({
          errorMessages: error.response?.data?.error.split(";;"),
          showAlert: true,
        }));
        return;
      }
      if (error.response?.data?.message) {
        this.setState(() => ({
          errorMessages: [
            `${error.response?.data.error} : ${error.response?.data.message}`,
          ],
          showAlert: true,
        }));
        return;
      }
    }
  }

  async handleInputChange(event) {
    const target = event.target;
    let { name, value } = target;
    const updated = updateStateValue(this.state, name, value);
    await this.setState({
      updated,
    });
  }
  render() {
    return (
      <SSFormLayout>
        <Card.Body>
          <Card.Title as="h1">
            <FontAwesomeIcon icon={faCompactDisc} spin className="mr-2" />
            Cadastro de novos funcionarios
          </Card.Title>
          <SSalert
            showAlert={this.state.showAlert}
            messages={this.state.errorMessages}
          />
          <hr />
          <SSForm
            onSubmit={this.handleSubimit.bind(this)}
            onCancel={() => {}}
            validated={this.state.formError}
          >
            <h4>Dados pessoais</h4>
            <SignUpForm
              root="employee"
              client={this.state.employee}
              onChange={this.handleInputChange.bind(this)}
            />
            <Form.Row>
              <Form.Group as={Col} md={5}>
                <SSSelect
                  label="Tipo de cadastro"
                  name={`employee.permission`}
                  items={[
                    { id: "EMPLOYEE", description: "Funcionario" },
                    { id: "SALES_MANAGER", description: "Gerente de vendas" },
                  ]}
                  value={this.state?.employee?.permission || ""}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Form.Row>
          </SSForm>
        </Card.Body>
      </SSFormLayout>
    );
  }
}
