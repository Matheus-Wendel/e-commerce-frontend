import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import React, { Component } from "react";
import { Badge, Button, Col, Form } from "react-bootstrap";
import { apiGet } from "../../utils/api/api-utils";
import SSInput from "../form/SSInput";
import CouponTable from "./couponTable";

export default class TradeCouponForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tradeCoupons: [],
      tradeIsSelected: false,
      tradeSelected: {},
      purchaseSelected: {},
      purchaseIsSelected: false,
    };
  }

  async componentDidMount() {
    await this.fetchTradeCoupons();
  }

  async fetchTradeCoupons() {
    try {
      let tradeCoupons = await apiGet(process.env.REACT_APP_COUPON_ENDPOINT);

      this.setState({
        tradeCoupons,
      });
    } catch (error) {
      this.props.errorHandler(error);
    }
  }

  handleSelectedRowTradeCoupons(row) {
    let selectedRow = clone(row);
    this.setState({
      tradeSelected: selectedRow,
      tradeIsSelected: true,
    });
  }
  handleSelectedRowPurchaseCoupons(row) {
    let selectedRow = clone(row);
    this.setState({
      purchaseSelected: selectedRow,
      purchaseIsSelected: true,
    });
  }

  handleCleanSelectedTradeCoupon() {
    this.setState({
      tradeSelected: {},
      tradeIsSelected: false,
    });
  }
  handleCleanSelectedPurchaseCoupon() {
    this.setState({
      purchaseSelected: {},
      purchaseIsSelected: false,
    });
  }

  handleAddToCouponToPurchase() {
    const { tradeSelected } = this.state;
    let purchaseCoupons = this.props.purchaseCoupons;
    let exist = purchaseCoupons.find((coupon) => {
      return coupon.id === tradeSelected.id;
    });
    if (exist) {
      let error = { message: "Cupom ja ultilizado na compra" };
      this.props.errorHandler(error);
      return;
    }
    this.props.addPurchaseCoupon(tradeSelected);
    this.handleCleanSelectedTradeCoupon();
  }

  handleRemoveCouponFromPurchase() {
    const { purchaseSelected } = this.state;

    let purchaseCoupons = this.props.purchaseCoupons;
    let filtered = purchaseCoupons.filter((coupon) => {
      return coupon.id !== purchaseSelected.id;
    });

    this.props.removePurchaseCoupon(filtered);
    this.handleCleanSelectedPurchaseCoupon();
  }
  render() {
    return (
      <>
        <h2>
          <Badge variant="secondary">CUPONS DE TROCA</Badge>
        </h2>
        <CouponTable
          data={this.props.purchaseCoupons}
          onRowSelect={this.handleSelectedRowPurchaseCoupons.bind(this)}
        />
        <Form.Row>
          <Form.Group as={Col} md={9}>
            <SSInput
              label="Código do cupom"
              name={`coupon`}
              value={this.state?.purchaseSelected?.code || ""}
              disabled={true}
            />
          </Form.Group>
          <Col md={3} className="pt-4 mb-0">
            <Button
              className="mt-1 mb-0"
              type="submit"
              variant="primary"
              block
              disabled={!this.state.purchaseIsSelected}
              onClick={this.handleRemoveCouponFromPurchase.bind(this)}
            >
              <FontAwesomeIcon className="mr-2" icon={faTimes} />
              Remover da compra
            </Button>
          </Col>
        </Form.Row>
        <h3>Seus Cupons</h3>
        <CouponTable
          data={this.state.tradeCoupons}
          onRowSelect={this.handleSelectedRowTradeCoupons.bind(this)}
        />
        <Form.Row>
          <Form.Group as={Col} md={6}>
            <SSInput
              label="Código do cupom"
              name={`coupon`}
              value={this.state?.tradeSelected?.code || ""}
              disabled={true}
            />
          </Form.Group>

          <Col md={3} className="pt-4 mb-0">
            <Button
              className="mt-1 mb-0"
              type="submit"
              variant="primary"
              block
              disabled={!this.state.tradeIsSelected}
              onClick={this.handleAddToCouponToPurchase.bind(this)}
            >
              <FontAwesomeIcon className="mr-2" icon={faPlus} />
              Adicionar
            </Button>
          </Col>
          <Col md={3} className="pt-4 mb-0">
            <Button
              className="mt-1 mb-0"
              type="submit"
              variant="primary"
              block
              disabled={!this.state.tradeIsSelected}
              onClick={this.handleCleanSelectedTradeCoupon.bind(this)}
            >
              <FontAwesomeIcon className="mr-2" icon={faTimes} />
              Cancelar
            </Button>
          </Col>
        </Form.Row>
      </>
    );
  }
}
