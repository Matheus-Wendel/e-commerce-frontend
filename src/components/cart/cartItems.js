import {
  faMinus,
  faPlus,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import SsInput from "../form/SSInput";

export default class CartItems extends Component {
  render() {
    const { cartItems, showItemsOnly } = this.props;
    let cart = cartItems.map((item, i) => (
      <Row key={i}>
        <Card className="w-100">
          <Card.Body>
            <Row>
              <Col md={3}>
                <img
                  className="w-100 h-100"
                  src={item.disc.imgLink}
                  style={{
                    objectFit: "contain",
                  }}
                  alt="imgName"
                />
              </Col>
              <Col md={6}>
                <div className="p-2 mt-3">
                  <h4>{item.disc.description}</h4>
                  <h5>Unidade: R${item.disc.value}</h5>
                  <h5>Total: R${item.disc.value * item.quantity}</h5>
                </div>
              </Col>
              <Col md={3}>
                <div className="p-2">
                  <SsInput label="Quantidade" disabled value={item.quantity} />
                  {!showItemsOnly && (
                    <>
                      <Row className="mb-2">
                        <Col md={6}>
                          <Button
                            variant="secondary"
                            block
                            onClick={() => {
                              this.props.handleEditQuantity(i, 1);
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} className="" />
                          </Button>
                        </Col>
                        <Col md={6}>
                          <Button
                            variant="secondary"
                            block
                            onClick={() => {
                              this.props.handleEditQuantity(i, -1);
                            }}
                          >
                            <FontAwesomeIcon icon={faMinus} className="" />
                          </Button>
                        </Col>
                      </Row>
                      <Button
                        variant="secondary"
                        block
                        onClick={() => {
                          this.props.handleDeletefromCart(item.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="mr-2"
                        />
                        Remover
                      </Button>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    ));

    return <div>{cart}</div>;
  }
}
