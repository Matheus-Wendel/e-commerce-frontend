import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import AddressForm from "../../components/address/addressForm";
import SSForm from "../../components/form/SSForm";
import Layout from "../../layout/Layout";
import CartItems from "../../components/cart/cartItems";

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
                    className="overflow-auto"
                    style={{ maxHeight: "50vh", maxWidth: "100vh" }}
                  >
                    <CartItems />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-4" style={{ borderRadius: "0px" }}>
                <Card.Body>
                  <Card.Title as="h1">
                    <FontAwesomeIcon
                      icon={faCompactDisc}
                      spin
                      className="mr-2"
                    />
                    Pagamento e entrega
                  </Card.Title>
                  <hr />
                  <SSForm onSubmit={this.handlePreventDefaut}>
                    <h4>Endereço de entrega</h4>
                    <AddressForm />
                    <hr />
                  </SSForm>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}
