import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

export default class Login extends Component {
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

                <Form onSubmit={this.handlePreventDefaut}>
                  <Row className="mt-5">
                    <Col md={12}>
                      <Form.Control placeholder="Email" />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={12}>
                      <Form.Control placeholder="Senha" />
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
