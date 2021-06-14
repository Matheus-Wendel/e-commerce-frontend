import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import { getPurchaseStatus } from "../../utils/utils";
import SSInput from "../form/SSInput";
import CouponTable from "../coupon/couponTable";
import SSTable from "../table/SSTable";

export default class PurchaseControlForm extends Component {
  render() {
    let endereco = "";
    if (
      this.props?.purchase?.deliveryAddress?.addressDescription &&
      this.props?.purchase?.deliveryAddress?.number &&
      this.props?.purchase?.deliveryAddress?.city?.description &&
      this.props?.purchase?.deliveryAddress?.city?.state?.description
    ) {
      endereco =
        this.props?.purchase?.deliveryAddress?.addressDescription +
        " Nº:" +
        this.props?.purchase?.deliveryAddress?.number +
        " " +
        this.props?.purchase?.deliveryAddress?.city?.description +
        ", " +
        this.props?.purchase?.deliveryAddress?.city?.state?.description;
    }

    const tradeCouponsColumns = [
      {
        dataField: "code",
        text: "Código",
      },
      {
        dataField: "value",
        text: "Valor",
      },
    ];
    const purchaseCardsColumns = [
      {
        dataField: "value",
        text: "Valor pago",
      },
      {
        dataField: "creditCard.name",
        text: "Titular do cartão",
      },
    ];
    return (
      <>
        <Form.Row>
          <Form.Group as={Col} md={4}>
            <SSInput
              label="Data da compra"
              name={`${this.props.root}.purchaseDate`}
              value={this.props?.purchase?.purchaseDate || ""}
              disabled
            />
          </Form.Group>
          <Form.Group as={Col} md={4}>
            <SSInput
              label="Valor da compra"
              name={`${this.props.root}.value`}
              value={this.props?.purchase?.value || ""}
              disabled
            />
          </Form.Group>
          <Form.Group as={Col} md={4}>
            <SSInput
              label="CNPJ do cliente"
              name={`${this.props.root}.client.cpf`}
              value={this.props?.purchase?.client?.cpf || ""}
              disabled
            />
          </Form.Group>
          <Form.Group as={Col} md={8}>
            <SSInput
              label="Endereco de entrega"
              name={`${this.props.root}.client.cpf`}
              value={endereco}
              disabled
            />
          </Form.Group>
          <Form.Group as={Col} md={4}>
            <SSInput
              label="Cupom promocional utilizado"
              name={`codPromo`}
              value={this.props?.purchase?.promotionalCoupon?.code || ""}
              disabled
            />
          </Form.Group>
          <Form.Group as={Col} md={4}>
            <SSInput
              label="Cupom de troca gerado"
              name={`codPromo`}
              value={this.props?.purchase?.changeCoupon?.code || ""}
              disabled
            />
          </Form.Group>
          <Form.Group as={Col} md={4}>
            <SSInput
              label="Status da compra"
              name={`${this.props.root}.purchaseStatus`}
              value={
                getPurchaseStatus(this.props?.purchase?.purchaseStatus) || ""
              }
              disabled
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md={6}>
            <h3>Cupons de troca utilizados</h3>
            <SSTable
              data={this.props?.purchase?.tradeCoupons || []}
              columns={tradeCouponsColumns}
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <h3>Cartões utilizados </h3>
            <SSTable
              data={this.props?.purchase?.purchaseCards || []}
              columns={purchaseCardsColumns}
            />
          </Form.Group>
        </Form.Row>
      </>
    );
  }
}
