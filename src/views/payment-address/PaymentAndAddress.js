import {
  faCheckDouble,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import React, { Component } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import AddressForm from "../../components/address/addressForm";
import AddressTable from "../../components/address/addressTable";
import SSAlert from "../../components/alert/SSalert";
import CartItems from "../../components/cart/cartItems";
import PromotionalCouponForm from "../../components/coupon/PromotionalCouponForm";
import TradeCouponForm from "../../components/coupon/TradeCouponForm";
import PurchaseCreditCardForm from "../../components/creditCard/PurchaseCreditCardForm";
import Layout from "../../layout/Layout";
import { apiGet, apiPost } from "../../utils/api/api-utils";
import { alertMessageUtil, handleErrorMessage } from "../../utils/utils";

export default class PaymentAndAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
      adresses: [],
      deliveryAddress: {},
      promotionalCoupon: {},
      tradeCoupons: [],

      purchaseCards: [],

      total: 0,
      alert: alertMessageUtil(),
    };
  }

  async componentDidMount() {
    await this.fetchCart();
    await this.fetchAdresses();
  }
  async fetchAdresses() {
    try {
      let adresses = await apiGet(process.env.REACT_APP_ADDRESS_ENDPOINT);

      this.setState({
        adresses,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
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

  handleAddPurchaseCoupon(coupon) {
    let purchaseCoupons = clone(this.state.tradeCoupons);
    purchaseCoupons.push(coupon);
    this.setState({ tradeCoupons: purchaseCoupons });
  }
  handleRemovePurchaseCoupon(filteredList) {
    this.setState({ tradeCoupons: filteredList });
  }

  handleAddPurchaseCard(purchaseCard) {
    let purchaseCards = clone(this.state.purchaseCards);
    purchaseCards.push(purchaseCard);
    this.setState({ purchaseCards });
  }
  handleRemovePurchaseCard(filteredList) {
    console.log(filteredList);
    this.setState({ purchaseCards: filteredList });
  }
  handleSelectedRow(row) {
    let selectedRow = clone(row);
    selectedRow.state = { id: selectedRow.city.state.id };
    this.setState({
      deliveryAddress: selectedRow,
      isUpdate: true,
    });
  }

  handleSetPromoCoupon(coupon) {
    this.setState({
      promotionalCoupon: coupon,
    });
  }
  handleUnifyErrorMessage(error) {
    handleErrorMessage(this.setState.bind(this), error);
  }

  async handlefinishPurchase() {
    const {
      deliveryAddress,
      purchaseCards,
      promotionalCoupon,
      tradeCoupons,
    } = this.state;

    let body = {
      tradeCoupons,
      promotionalCoupon,
      purchaseCards: purchaseCards.map((item) => {
        return { value: item.value, creditCard: { id: item.creditCard.id } };
      }),
      deliveryAddress,
    };
    try {
      await apiPost(process.env.REACT_APP_PURCHASE_ENDPOINT, body);
      window.location.href = "/myPurchases?compra=finalizada";
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }
  render() {
    return (
      <Layout>
        <Container
          className="mt-5"
          style={{ minHeight: "100vh", backgroundColor: "#191c1f" }}
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
                    Pagamento e Envio
                  </Card.Title>
                  <hr />
                  <h2>
                    <Badge variant="secondary">CARRINHO</Badge>
                  </h2>
                  <div
                    className="p-0"
                    style={{ maxHeight: "30vh", overflowX: "hidden" }}
                  >
                    <CartItems
                      cartItems={this.state.cart?.cartProducts || []}
                      showItemsOnly={true}
                    />
                  </div>
                  <hr />
                  <h2>
                    <Badge variant="secondary">ENVIO</Badge>
                  </h2>
                  <AddressForm
                    root="deliveryAddress"
                    address={this.state.deliveryAddress}
                    disabled
                  />
                  <hr />
                  <h3>Seus endereços</h3>
                  <AddressTable
                    data={this.state.adresses}
                    onRowSelect={this.handleSelectedRow.bind(this)}
                  />
                  <hr />
                  <h2>
                    <Badge variant="secondary">CUPOM PROMOCIONAL</Badge>
                  </h2>
                  <PromotionalCouponForm
                    errorHandler={this.handleUnifyErrorMessage.bind(this)}
                    setPromoCoupon={this.handleSetPromoCoupon.bind(this)}
                    root="promotionalCoupon"
                    promoCoupon={this.state.promotionalCoupon}
                  />
                  <hr />
                  <TradeCouponForm
                    errorHandler={this.handleUnifyErrorMessage.bind(this)}
                    purchaseCoupons={this.state.tradeCoupons}
                    addPurchaseCoupon={this.handleAddPurchaseCoupon.bind(this)}
                    removePurchaseCoupon={this.handleRemovePurchaseCoupon.bind(
                      this
                    )}
                  />
                  <hr />
                  <PurchaseCreditCardForm
                    errorHandler={this.handleUnifyErrorMessage.bind(this)}
                    purchaseCards={this.state.purchaseCards}
                    addPurchaseCard={this.handleAddPurchaseCard.bind(this)}
                    removePurchaseCard={this.handleRemovePurchaseCard.bind(
                      this
                    )}
                  />

                  <Row>
                    <Col md={6}>
                      <Button
                        type="submit"
                        variant="primary"
                        block
                        disabled={!this.state.cart?.cartProducts?.length}
                        onClick={this.handlefinishPurchase.bind(this)}
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faCheckDouble}
                        />
                        Finalizar compra
                      </Button>
                    </Col>
                    <Col md={6}>
                      <h3>Total: R${this.state.total}</h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}
