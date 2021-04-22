import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { apiGet } from "../../utils/api/api-utils";
import { updateStateValue } from "../../utils/utils";
import SSInput from "../form/SSInput";

export default class PromotionalCouponForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupon: "",
    };
  }

  async handleInputChange(event) {
    const target = event.target;
    let { name, value } = target;
    const updated = updateStateValue(this.state, name, value);
    await this.setState({
      updated,
    });
  }
  async handleSearchCoupon() {
    try {
      let [coupon] = await apiGet(process.env.REACT_APP_COUPON_ENDPOINT, {
        code: this.state.coupon,
        promotional: 1,
      });
      if (!coupon) {
        let error = { message: "Código de cupom não encontrado" };
        this.props.errorHandler(error);
        return;
      }
      this.props.setPromoCoupon(coupon);
    } catch (error) {
      this.props.errorHandler(error);
    }
  }

  render() {
    return (
      <Form.Row>
        <Form.Group as={Col} md={9}>
          <SSInput
            label="Código do cupom"
            name={`coupon`}
            value={this.state?.coupon}
            onChange={this.handleInputChange.bind(this)}
            // disabled={this.props.disabled}
          />
        </Form.Group>

        <Col md={3} className="pt-4 mb-0">
          <Button
            className="mt-1 mb-0"
            type="submit"
            variant="primary"
            block
            // disabled={!this.state.cart?.cartProducts?.length}
            onClick={this.handleSearchCoupon.bind(this)}
          >
            <FontAwesomeIcon className="mr-2" icon={faSearch} />
            Buscar
          </Button>
        </Col>
        <Form.Group as={Col} md={5}>
          <SSInput
            label="Valor do cupom"
            name={`${this.props.root}.value`}
            placeholder="R$0"
            value={
              this.props?.promoCoupon?.value
                ? `R$${this.props?.promoCoupon?.value}`
                : ""
            }
            disabled={true}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <SSInput
            label="Validade"
            type="date"
            name={`${this.props.root}.expirationDate`}
            value={this.props?.promoCoupon?.expirationDate || ""}
            disabled={true}
          />
        </Form.Group>
        <Col md={3} className="pt-4 mb-0">
          <Button
            className="mt-1 mb-0"
            type="submit"
            variant="primary"
            block
            disabled={!this.props?.promoCoupon?.id}
            onClick={() => {
              this.props.setPromoCoupon({});
            }}
          >
            <FontAwesomeIcon className="mr-2" icon={faTimes} />
            Remover
          </Button>
        </Col>
      </Form.Row>
    );
  }
}
