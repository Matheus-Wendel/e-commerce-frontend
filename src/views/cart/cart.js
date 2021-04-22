import { faCompactDisc, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import React, { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SSAlert from "../../components/alert/SSalert";
import CartItems from "../../components/cart/cartItems";
import Layout from "../../layout/Layout";
import { apiDelete, apiGet, apiPut } from "../../utils/api/api-utils";
import {
  alertMessageUtil,
  handleErrorMessage,
  handleSetAlert,
} from "../../utils/utils";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
      total: 0,
      alert: alertMessageUtil(),
    };
  }

  async componentDidMount() {
    await this.fetchCart();
  }
  async fetchCart() {
    try {
      let [cart] = await apiGet(process.env.REACT_APP_CART_ENDPOINT);
      let total = 0;
      if (cart?.cartProducts.length) {
        total = cart.cartProducts
          .map((cp) => cp.quantity * cp.disc.value)
          .reduce((x, y) => x + y);
      }
      this.setState({
        cart,
        total,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleDeletefromCart(id) {
    try {
      await apiDelete(process.env.REACT_APP_CART_PRODUCT_ENDPOINT, id);
      handleSetAlert(
        this.setState.bind(this),
        ["Item excluido com sucesso"],
        "Sucesso",
        "success"
      );
      await this.fetchCart();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleUpdateCart() {
    const { cart } = this.state;

    // console.log(Object.values(data_sample).map((x) => x.data_needed_to_sum_up).reduce((x, y) => x + y));
    try {
      await apiPut(process.env.REACT_APP_CART_ENDPOINT, cart);
      window.location.href = "/paymentAndAddress";
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  handleEditQuantity(index, value) {
    const { cart } = this.state;

    let cartClone = clone(cart);
    let cartProductsClone = cartClone.cartProducts;
    let item = cartProductsClone[index];

    if (item.quantity + value === 0 || item.quantity + value > 99) {
      return;
    }
    item.quantity += value;
    this.setState({
      cart: cartClone,
    });
  }

  render() {
    return (
      <Layout>
        <Container
          className="mt-5"
          style={{ height: "100vh", backgroundColor: "#191c1f" }}
        >
          <SSAlert
            showAlert={this.state.alert.show}
            messages={this.state.alert.messages}
            variant={this.state.alert.variant}
            title={this.state.alert.title}
          />

          <Row>
            <Col>
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
                    <CartItems
                      cartItems={this.state.cart?.cartProducts || []}
                      handleEditQuantity={this.handleEditQuantity.bind(this)}
                      handleDeletefromCart={this.handleDeletefromCart.bind(
                        this
                      )}
                    />
                  </div>
                  <hr />
                  <Row>
                    <Col md={6}>
                      <Button
                        type="submit"
                        variant="primary"
                        block
                        disabled={!this.state.cart?.cartProducts?.length}
                        onClick={this.handleUpdateCart.bind(this)}
                      >
                        <FontAwesomeIcon className="mr-2" icon={faWallet} />
                        Pagamento e envio
                      </Button>
                    </Col>
                    <Col md={6}>
                      <h3>Total: R${this.state.total}</h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            {/* 
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
          */}
          </Row>
        </Container>
      </Layout>
    );
  }
}
