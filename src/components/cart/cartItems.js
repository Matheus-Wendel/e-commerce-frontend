import React, { Component } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import SsInput from "../form/SSInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
export default class CartItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [{}],
    };
  }
  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  render() {
    const cart = [];

    for (let i = 0; i < 5; i++) {
      cart.push(
        <Row>
          <Card className="w-100">
            <Card.Body>
              <Row>
                <Col md={3}>
                  <img
                    className="w-100 h-100"
                    src={`https://picsum.photos/500/500?random=${i}`}
                    style={{
                      objectFit: "contain",
                    }}
                    alt="imgName"
                  />
                </Col>
                <Col md={6}>
                  <div className="p-2 mt-3">
                    <h4>Disco {i}</h4>
                    <h5>Valor: R$50,00</h5>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="p-2">
                    <SsInput label="Quantidade" />
                    <Button variant="secondary" block>
                      <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                      Remover
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      );
    }

    return <div>{cart}</div>;
  }
}
