import {
  faCompactDisc,
  faCreditCard,
  faPlus,
  faSync,
  faUndo,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import CartItems from "../../components/cart/cartItems";
import SSSelect from "../../components/form/SSSelect";
import Layout from "../../layout/Layout";

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
      <Layout>
        <Container
          className="mt-5"
          style={{ height: "100vh", backgroundColor: "#191c1f" }}
        >
          <Row>
            <Col md={8}>
              <Card className="p-4" style={{ borderRadius: "0px" }}>
                <Card.Body>
                  <Card.Title as="h1">
                    <FontAwesomeIcon
                      icon={faCompactDisc}
                      spin
                      className="mr-2"
                    />
                    Meu carrinho
                  </Card.Title>
                  <hr />
                  <div
                    className="p-0"
                    style={{ maxHeight: "50vh", overflowX: "hidden" }}
                  >
                    <CartItems />
                  </div>
                  <hr />
                  <Row>
                    <Col md={4}>
                      <Button
                        type="submit"
                        variant="primary"
                        block
                        disabled={this.props?.disabled}
                        onClick={this.handlePreventDefaut}
                      >
                        <FontAwesomeIcon className="mr-2" icon={faWallet} />
                        Finalizar compra
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        type="submit"
                        variant="secondary"
                        block
                        disabled={this.props?.disabled}
                        onClick={this.handlePreventDefaut}
                      >
                        <FontAwesomeIcon className="mr-2" icon={faSync} />
                        Atualizar Carrinho
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        type="submit"
                        variant="info"
                        block
                        disabled={this.props?.disabled}
                        onClick={this.handlePreventDefaut}
                      >
                        <FontAwesomeIcon className="mr-2" icon={faUndo} />
                        Restaurar
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-4" style={{ borderRadius: "0px" }}>
                <Card.Body>
                  <Card.Title as="h3">
                    <FontAwesomeIcon
                      icon={faCompactDisc}
                      spin
                      className="mr-2"
                    />
                    Pagamento e entrega
                  </Card.Title>
                  <hr />
                  <h5>Endereço de entrega</h5>
                  <Row>
                    <Col md={9}>
                      <SSSelect
                        name={`${this.props.root}.state`}
                        items={[
                          { code: 1, description: "Casa" },
                          { code: 2, description: "Trabalho" },
                        ]}
                        value={this.props?.client?.genre || ""}
                        onChange={this.props.onChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        className="m-0"
                        block
                        disabled={this.props?.disabled}
                        onClick={this.handlePreventDefaut}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </Col>
                  </Row>
                  <hr />
                  <h5>Pagamento</h5>
                  <Row>
                    <Col md={9}>
                      <SSSelect
                        name={`${this.props.root}.state`}
                        items={[
                          { code: 1, description: "Final 5555" },
                          { code: 2, description: "Final 4444" },
                        ]}
                        value={this.props?.client?.genre || ""}
                        onChange={this.props.onChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        className="m-0"
                        block
                        disabled={this.props?.disabled}
                        onClick={this.handlePreventDefaut}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </Col>

                    <InputGroup as={Col}>
                      <InputGroup.Prepend>
                        <InputGroup.Text>R$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl placeholder="00,00" />
                    </InputGroup>

                    <Col md={12}>
                      <hr />
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        className="m-0"
                        block
                        disabled={this.props?.disabled}
                        onClick={this.handlePreventDefaut}
                      >
                        <FontAwesomeIcon className="mr-2" icon={faCreditCard} />
                        Dividir com um novo cartão
                      </Button>
                    </Col>
                  </Row>
                  <hr />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}
