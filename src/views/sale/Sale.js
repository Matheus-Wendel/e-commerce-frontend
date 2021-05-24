import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSAlert from "../../components/alert/SSalert";
import SSForm from "../../components/form/SSForm";
import PricingTable from "../../components/pricing/pricingTable";
import SaleForm from "../../components/sale/saleForm";
import SSFormLayout from "../../layout/SSFormLayout";
import { apiDelete, apiGet, apiPost, apiPut } from "../../utils/api/api-utils";
import {
  alertMessageUtil,
  handleErrorMessage,
  handleSetAlert,
  updateStateValue,
} from "../../utils/utils";
import SaleModel from "./SaleModel";
import PricingModel from "../pricing/PricingModel";

export default class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      pricing: new PricingModel(),
      isUpdate: false,
      prices: [],
    };
  }
  async componentDidMount() {
    await this.fetchPrices();
  }
  async fetchPrices() {
    try {
      let prices = await apiGet(process.env.REACT_APP_PRICING_ENDPOINT);
      console.log(prices);
      this.setState({
        prices,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const { pricing, isUpdate } = this.state;
      if (isUpdate) {
        await apiPut(process.env.REACT_APP_SALE_ENDPOINT, pricing.sale);
        handleSetAlert(
          this.setState.bind(this),
          ["Promoção atualizada com sucesso"],
          "sucesso",
          "success"
        );
      } else {
        await apiPost(process.env.REACT_APP_SALE_ENDPOINT, pricing.sale);
        handleSetAlert(
          this.setState.bind(this),
          ["Promoção cadastrada com sucesso"],
          "sucesso",
          "success"
        );
      }
      this.handleClear();
      await this.fetchPrices();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  handleSelectedRow(row) {
    let selectedRow = clone(row);

    console.log(selectedRow);
    this.setState({
      isUpdate: true,
      pricing: selectedRow,
    });
  }
  handleClear() {
    this.setState({
      isUpdate: false,
      pricing: new PricingModel(),
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
            Cadastro de Promoções
          </Card.Title>
          <SSAlert
            showAlert={this.state.alert.show}
            messages={this.state.alert.messages}
            variant={this.state.alert.variant}
            title={this.state.alert.title}
          />
          <hr />

          <SSForm
            onSubmit={this.handleSubmit.bind(this)}
            onCancel={this.handleClear.bind(this)}
            customSubmitText={"Atualizar"}
            disabled={!this.state.isUpdate}
          >
            <SaleForm
              root="pricing.sale"
              sale={this.state.pricing?.sale}
              onChange={this.handleInputChange.bind(this)}
              disabled={!this.state.isUpdate}
            />
            <hr />
          </SSForm>
          <hr />
          <h3>Precificações cadastradas</h3>
          <PricingTable
            onRowSelect={this.handleSelectedRow.bind(this)}
            data={this.state.prices}
          />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
