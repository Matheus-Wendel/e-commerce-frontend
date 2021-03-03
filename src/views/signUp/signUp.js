import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import clone from "clone";

import AddressForm from "../../components/address/addressForm";
import SignUpForm from "../../components/client/signUpForm";
import SSForm from "../../components/form/SSForm";
import { updateStateValue } from "../../utils/utils";
import SignUpModel from "./signUpModel";
import { apiPost } from "../../utils/api/api-utils";
import SSalert from "../../components/alert/SSalert";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: new SignUpModel(),
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
      <Container
        fluid
        className="d-flex justify-content-center align-items-center py-5"
        style={{ backgroundColor: "#191c1f" }}
      >
        <Row>
          <Col md={12}>
            <Card className="p-4" style={{ borderRadius: "0px" }}>
              <Card.Body>
                <Card.Title as="h1">
                  <FontAwesomeIcon icon={faCompactDisc} spin className="mr-2" />
                  Cadastre-se
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
                    root="client"
                    client={this.state.client}
                    onChange={this.handleInputChange.bind(this)}
                  />
                  <hr />
                  <h4>Endereço de entrega</h4>
                  <AddressForm
                    root="client.billingAddress"
                    address={this.state.client.billingAddress}
                    onChange={this.handleInputChange.bind(this)}
                  />
                  <hr />
                  <h4>Endereço de Cobrança</h4>
                  <AddressForm
                    root="client.deliveryAddresses"
                    address={this.state.client.deliveryAddresses}
                    onChange={this.handleInputChange.bind(this)}
                  />
                  <hr />
                </SSForm>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
