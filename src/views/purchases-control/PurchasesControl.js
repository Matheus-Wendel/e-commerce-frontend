import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSAlert from "../../components/alert/SSalert";
import SSForm from "../../components/form/SSForm";
import PurchaseControlForm from "../../components/purchases/PurchaseControlForm";
import PurchaseTable from "../../components/purchases/PurchaseTable";
import SSFormLayout from "../../layout/SSFormLayout";
import { apiGet, apiPut } from "../../utils/api/api-utils";
import {
  alertMessageUtil,
  handleErrorMessage,
  updateStateValue,
} from "../../utils/utils";

export default class PurchasesControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      purchases: [],
      purchase: {},
      isSelected: false,
    };
  }
  async componentDidMount() {
    await this.fetchPurchases();
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const { purchase } = this.state;

    try {
      await apiPut(process.env.REACT_APP_PURCHASE_ENDPOINT, purchase);
      this.handleClear();
      await this.fetchPurchases();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async fetchPurchases() {
    try {
      let purchases = await apiGet(
        process.env.REACT_APP_PURCHASE_CONTROL_ENDPOINT
      );
      this.setState({
        purchases,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleSelectedRow(row) {
    let selectedRow = clone(row);

    this.setState({
      purchase: selectedRow,
      isSelected: true,
    });
  }

  handleClear() {
    this.setState({
      purchase: {},
      isSelected: false,
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
            Gerenciamento de Compras
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
            customSubmitText={"Avançar status da compra"}
            onCancel={this.handleClear.bind(this)}
            disabled={!this.state.isSelected}
          >
            <PurchaseControlForm
              root="purchase"
              purchase={this.state.purchase}
            />
            <hr />
          </SSForm>
          <hr />
          <h3>Solicitações de troca</h3>
          <PurchaseTable
            data={this.state.purchases}
            onRowSelect={this.handleSelectedRow.bind(this)}
          />
          <hr />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
