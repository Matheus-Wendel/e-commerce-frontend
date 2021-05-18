import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import SSAlert from "../../components/alert/SSalert";
import ExchangesTable from "../../components/exchanges/ExchangesTable";
import SSForm from "../../components/form/SSForm";
import SSSelect from "../../components/form/SSSelect";
import PurchaseItemDevolutionForm from "../../components/purchases/PurchaseItemDevolutionForm";
import SSFormLayout from "../../layout/SSFormLayout";
import { apiGet, apiPut } from "../../utils/api/api-utils";
import {
  alertMessageUtil,
  handleErrorMessage,
  handleSetAlert,
  updateStateValue,
} from "../../utils/utils";
import CreditCardModel from "./CreditCardModel";

export default class Exchanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      tradeRequests: [],
      tradeRequest: {},
      inExchangeTrades: [],
      inExchangeTrade: {},
      finishedTrades: [],
      finishedTrade: {},
    };
  }
  async componentDidMount() {
    await this.fetchTradeRequests();
    await this.fetchInExchangeTrades();
    await this.fetchFinishedTrades();
  }

  async fetchTradeRequests() {
    try {
      let tradeRequests = await apiGet(process.env.REACT_APP_TRADE_ENDPOINT, {
        status: "REQUESTED",
      });

      console.log(tradeRequests);
      this.setState({
        tradeRequests,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }
  async fetchInExchangeTrades() {
    try {
      let inExchangeTrades = await apiGet(
        process.env.REACT_APP_TRADE_ENDPOINT,
        { status: "IN_EXCHANGE" }
      );
      console.log(inExchangeTrades);

      this.setState({
        inExchangeTrades,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }
  async fetchFinishedTrades() {
    try {
      let finishedTrades = await apiGet(process.env.REACT_APP_TRADE_ENDPOINT, {
        status: "FINISHED",
      });

      console.log(finishedTrades);
      this.setState({
        finishedTrades,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }
  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleSelectedTradeRequestRow(row) {
    let selectedRow = clone(row);

    this.setState({
      tradeRequest: selectedRow,
    });
  }
  handleSelectedInExchangeTradeRow(row) {
    let selectedRow = clone(row);

    this.setState({
      inExchangeTrade: selectedRow,
    });
  }
  handleSelectedFinishedTradeRow(row) {
    let selectedRow = clone(row);

    this.setState({
      finishedTrade: selectedRow,
    });
  }

  handleSetMessages(messages = [], show = false, title = "", variant = "") {
    this.setState(() => ({
      alert: alertMessageUtil(messages, show, title, variant),
    }));
  }

  async handleSubimitTradeRequest(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const { tradeRequest } = this.state;
      await apiPut(process.env.REACT_APP_TRADE_ENDPOINT, tradeRequest);
      await this.fetchTradeRequests();
      await this.fetchInExchangeTrades();
      this.setState({
        tradeRequest: {},
      });
      handleSetAlert(
        this.setState.bind(this),
        ["Troca aceita com sucesso"],
        "sucesso",
        "success"
      );
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }
  async handleSubimitinExchangeTrade(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const { inExchangeTrade } = this.state;
      console.log(inExchangeTrade);
      await apiPut(process.env.REACT_APP_TRADE_ENDPOINT, inExchangeTrade);
      await this.fetchInExchangeTrades();
      await this.fetchFinishedTrades();
      this.setState({
        inExchangeTrade: {},
      });

      handleSetAlert(
        this.setState.bind(this),
        ["Troca finalizada com sucesso"],
        "sucesso",
        "success"
      );
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }
  handleClear() {
    this.setState({
      creditCard: new CreditCardModel(),
      isUpdate: false,
    });
  }

  async handleInputChange(event) {
    const target = event.target;
    let { name, value } = target;
    const updated = updateStateValue(this.state, name, value);
    await this.setState({
      updated,
    });
  }
  render() {
    return (
      <SSFormLayout>
        <Card.Body>
          <Card.Title as="h1">
            <FontAwesomeIcon icon={faCompactDisc} spin className="mr-2" />
            Gerenciamento de trocas
          </Card.Title>
          <SSAlert
            showAlert={this.state.alert.show}
            messages={this.state.alert.messages}
            variant={this.state.alert.variant}
            title={this.state.alert.title}
          />
          <hr />
          <SSForm
            onSubmit={this.handleSubimitTradeRequest.bind(this)}
            customSubmitText={"Aceitar solicitação"}
            disabled={this.state.tradeRequest.id == null}
            onCancel={() => {
              this.setState({ tradeRequest: {} });
            }}
          >
            <PurchaseItemDevolutionForm
              root="purchaseItem"
              purchaseItem={this.state.tradeRequest.purchaseItem}
            />
            <hr />
          </SSForm>
          <hr />
          <h3>Solicitações de troca</h3>
          <ExchangesTable
            data={this.state.tradeRequests}
            onRowSelect={this.handleSelectedTradeRequestRow.bind(this)}
          />
          <hr />
          <h3>Trocas Aceitas</h3>
          <SSForm
            onSubmit={this.handleSubimitinExchangeTrade.bind(this)}
            customSubmitText={"Finalizar Troca"}
            disabled={this.state.inExchangeTrade?.id == null}
            onCancel={() => {
              this.setState({ inExchangeTrade: {} });
            }}
          >
            <PurchaseItemDevolutionForm
              root="purchaseItem"
              purchaseItem={this.state.inExchangeTrade?.purchaseItem}
            />
            <hr />
            <Form.Row>
              <Form.Group as={Col} md={5}>
                <SSSelect
                  label="Retornar ao estoque?"
                  name={`inExchangeTrade.returnToStock`}
                  items={[
                    { id: true, description: "Sim" },
                    { id: false, description: "Não" },
                  ]}
                  value={this.state?.inExchangeTrade.returnToStock || ""}
                  onChange={this.handleInputChange.bind(this)}
                  required
                />
              </Form.Group>
            </Form.Row>
            <hr />
          </SSForm>
          <hr />
          <h3>Trocas Aceitas</h3>
          <ExchangesTable
            data={this.state.inExchangeTrades}
            onRowSelect={this.handleSelectedInExchangeTradeRow.bind(this)}
          />
          <hr />
          <h3>Trocas Finalizadas</h3>
          <ExchangesTable
            data={this.state.finishedTrades}
            onRowSelect={() => {}}
          />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
