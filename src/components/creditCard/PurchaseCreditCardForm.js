import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import React, { Component } from "react";
import { Badge, Button, Col, Form } from "react-bootstrap";
import { apiGet } from "../../utils/api/api-utils";
import { updateStateValue } from "../../utils/utils";
import SSInput from "../form/SSInput";
import CreditCardTable from "./creditCardTable";
import PurchaseCardsTable from "./PurchaseCardsTable";

export default class PurchaseCreditCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCards: [],
      creditCardIsSelected: false,
      creditCardSelected: {},
      creditCardSelectedValue: "",
      purchaseCreditCardSelected: {},
      purchaseCreditCardIsSelected: false,
    };
  }

  async componentDidMount() {
    await this.fetchCreditCards();
  }

  async fetchCreditCards() {
    try {
      let creditCards = await apiGet(
        process.env.REACT_APP_CREDIT_CARD_ENDPOINT
      );

      this.setState({
        creditCards,
      });
    } catch (error) {
      this.props.errorHandler(error);
    }
  }
  async handleInputChange(event) {
    const target = event.target;
    let { name, value } = target;
    const updated = updateStateValue(this.state, name, value);
    await this.setState({
      updated,
    });
  }
  handleSelectedRowcreditCards(row) {
    let selectedRow = clone(row);
    this.setState({
      creditCardSelected: selectedRow,
      creditCardIsSelected: true,
    });
  }
  handleSelectedRowPurchaseCards(row) {
    let selectedRow = clone(row);
    this.setState({
      purchaseCreditCardSelected: selectedRow,
      purchaseCreditCardIsSelected: true,
    });
  }

  handleCleanSelectedCard() {
    this.setState({
      creditCardSelected: {},
      creditCardIsSelected: false,
      creditCardSelectedValue: 0,
    });
  }
  handleCleanSelectedPurchaseCard() {
    this.setState({
      purchaseCreditCardSelected: {},
      purchaseCreditCardIsSelected: false,
    });
  }

  handleAddCardToPurchase() {
    const { creditCardSelected, creditCardSelectedValue } = this.state;
    let purchaseCards = this.props.purchaseCards;
    let exist = purchaseCards.find((item) => {
      return item.creditCard.id === creditCardSelected.id;
    });
    if (exist) {
      let error = { message: "Cartão ja ultilizado na compra" };
      this.props.errorHandler(error);
      return;
    }

    this.props.addPurchaseCard({
      creditCard: creditCardSelected,
      value: creditCardSelectedValue,
    });
    this.handleCleanSelectedCard();
  }

  handleRemoveCardFromPurchase() {
    const { purchaseCreditCardSelected } = this.state;

    let purchaseCards = this.props.purchaseCards;
    let filtered = purchaseCards.filter((item) => {
      return item.creditCard.id !== purchaseCreditCardSelected.creditCard.id;
    });

    this.props.removePurchaseCard(filtered);
    this.handleCleanSelectedPurchaseCard();
  }
  render() {
    return (
      <>
        <h2>
          <Badge variant="secondary">CARTÕES PARA PAGAMENTO</Badge>
        </h2>
        <PurchaseCardsTable
          data={this.props.purchaseCards}
          onRowSelect={this.handleSelectedRowPurchaseCards.bind(this)}
        />
        <Form.Row>
          <Form.Group as={Col} md={5}>
            <SSInput
              label="Numero do cartão"
              name={`creditCard`}
              value={
                this.state?.purchaseCreditCardSelected?.creditCard?.number || ""
              }
              disabled={true}
            />
          </Form.Group>
          <Form.Group as={Col} md={4}>
            <SSInput
              label="Valor nesse cartão"
              name={`purchaseCreditCardSelected.value`}
              value={this.state?.purchaseCreditCardSelected?.value || ""}
              disabled={true}
            />
          </Form.Group>
          <Col md={3} className="pt-4 mb-0">
            <Button
              className="mt-1 mb-0"
              type="submit"
              variant="primary"
              block
              disabled={!this.state.purchaseCreditCardIsSelected}
              onClick={this.handleRemoveCardFromPurchase.bind(this)}
            >
              <FontAwesomeIcon className="mr-2" icon={faTimes} />
              Remover da compra
            </Button>
          </Col>
        </Form.Row>
        <h3>Seus Cartões</h3>
        <CreditCardTable
          data={this.state.creditCards}
          onRowSelect={this.handleSelectedRowcreditCards.bind(this)}
        />
        <Form.Row>
          <Form.Group as={Col} md={4}>
            <SSInput
              label="Numero do cartão"
              name={`cardNumber`}
              value={this.state?.creditCardSelected?.number || ""}
              disabled={true}
            />
          </Form.Group>
          <Form.Group as={Col} md={2}>
            <SSInput
              label="Valor nesse cartão"
              name={`creditCardSelectedValue`}
              value={this.state?.creditCardSelectedValue || ""}
              disabled={!this.state.creditCardIsSelected}
              onChange={this.handleInputChange.bind(this)}
            />
          </Form.Group>

          <Col md={3} className="pt-4 mb-0">
            <Button
              className="mt-1 mb-0"
              type="submit"
              variant="primary"
              block
              disabled={!this.state.creditCardIsSelected}
              onClick={this.handleAddCardToPurchase.bind(this)}
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
              disabled={!this.state.creditCardIsSelected}
              onClick={this.handleCleanSelectedCard.bind(this)}
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
