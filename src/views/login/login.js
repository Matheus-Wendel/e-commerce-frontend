import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import React, { Component } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import SSalert from "../../components/alert/SSalert";
import { apiLogin } from "../../utils/api/api-utils";
import { updateStateValue } from "../../utils/utils";

const querystring = require("querystring");

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      messages: [],
      alertVariant: "",
      alertTitle: "",
      user: { email: "", password: "" },
    };
  }
  componentDidMount() {
    localStorage.clear();
    let status = querystring.parse(this.props.location.search);

    if (status["?status"] == "cadastro") {
      this.setState({
        showAlert: true,
        messages: [
          "Cadastro realizado com successo, faça login para continuar",
        ],
        alertVariant: "success",
        alertTitle: "Sucesso",
      });
    }
    if (status["?status"] == "atualizado") {
      this.setState({
        showAlert: true,
        messages: [
          "Atualização de dados realizado com successo, faça login novamente para continuar",
        ],
        alertVariant: "success",
        alertTitle: "Sucesso",
      });
    }
    if (status["?status"] == "desativado") {
      this.setState({
        showAlert: true,
        messages: ["Usuario desativado com sucesso"],
        alertVariant: "success",
        alertTitle: "Sucesso",
      });
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
  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
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

    const user = clone(this.state.user);

    try {
      await apiLogin(user);
      window.location.href = "/";
    } catch (error) {
      if (error.response?.status == 403) {
        this.setState({
          showAlert: true,
          messages: ["Informações incorretas"],
          alertVariant: "",
          alertTitle: "",
        });
        return;
      }
      if (error.response?.data?.message) {
        this.setState({
          showAlert: true,
          messages: [
            `${error.response?.data.error} : ${error.response?.data.message}`,
          ],
          alertVariant: "",
          alertTitle: "",
        });
        return;
      }
    }
  }

  render() {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: "#191c1f" }}
      >
        <Row>
          <Col md={12}>
            <Card
              className="p-4"
              style={{ width: "55vh", borderRadius: "0px" }}
            >
              <Card.Body>
                <Card.Title as="h1" className="text-center">
                  <FontAwesomeIcon icon={faCompactDisc} spin className="mr-2" />
                  <p>SoundSource</p>
                </Card.Title>
                <Card.Subtitle className="mb-5 text-muted text-center">
                  Login
                </Card.Subtitle>
                <hr />
                <SSalert
                  showAlert={this.state.showAlert}
                  messages={this.state.messages}
                  variant={this.state.alertVariant}
                  title={this.state.alertTitle}
                />
                <Form onSubmit={this.handleSubimit.bind(this)} noValidate>
                  <Row className="mt-5">
                    <Col md={12}>
                      <Form.Control
                        placeholder="Email"
                        onChange={this.handleInputChange.bind(this)}
                        name="user.email"
                        value={this.state.user.email}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={12}>
                      <Form.Control
                        type="password"
                        placeholder="Senha"
                        onChange={this.handleInputChange.bind(this)}
                        name="user.password"
                        value={this.state.user.password}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-5 text-center">
                    <Col md={6}>
                      <Button
                        type="submit"
                        className="block-button col"
                        variant="primary"
                        style={{ borderRadius: "0px" }}
                      >
                        Entrar
                      </Button>
                    </Col>
                    <Col md={6}>
                      <Button
                        className="block-button col"
                        variant="secondary"
                        href="/"
                        style={{ borderRadius: "0px" }}
                      >
                        Cancelar
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
