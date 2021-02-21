import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import AddressForm from "../../components/address/addressForm";
import SignUpForm from "../../components/client/signUpForm";
import SSForm from "../../components/form/SSForm";

import SsForm from "../../components/form/SSForm";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
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
                <hr />
                <SSForm onSubmit={this.handlePreventDefaut}>
                  <h4>Dados pessoais</h4>
                  <SignUpForm />
                  <hr />
                  <h4>Endereço de entrega</h4>
                  <AddressForm />
                  <hr />
                  <h4>Endereço de Cobrança</h4>
                  <AddressForm />
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
