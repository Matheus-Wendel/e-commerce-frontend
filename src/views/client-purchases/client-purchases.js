import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSAlert from "../../components/alert/SSalert";
import SSForm from "../../components/form/SSForm";
import PurchaseControlForm from "../../components/purchases/PurchaseControlForm";
import PurchaseItemDevolutionForm from "../../components/purchases/PurchaseItemDevolutionForm";
import PurchaseItemsTable from "../../components/purchases/PurchaseItemsTable";
import PurchaseTable from "../../components/purchases/PurchaseTable";
import SSFormLayout from "../../layout/SSFormLayout";
import { apiGet, apiPost } from "../../utils/api/api-utils";
import {
  alertMessageUtil,
  handleErrorMessage,
  handleSetAlert,
  updateStateValue,
} from "../../utils/utils";
const querystring = require("querystring");
export default class ClientPurchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      purchaseItems: [],
      purchase: {},
      purchases: [],
      purchaseItem: {},
      selectedTrade: false,
    };
  }
  async componentDidMount() {
    await this.fetchPurchases();
    let status = querystring.parse(this.props.location.search);

    if (status["?compra"] === "finalizada") {
      handleSetAlert(
        this.setState.bind(this),
        ["Compra realizada com sucesso"],
        "Sucesso",
        "success"
      );
    }
  }

  async handleRequestTrade(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const { purchaseItem } = this.state;
      let body = { purchaseItem: { id: purchaseItem.id } };
      await apiPost(process.env.REACT_APP_TRADE_ENDPOINT, body);
      await this.fetchPurchases();

      this.handleClear();
      handleSetAlert(
        this.setState.bind(this),
        ["Troca solicitada com sucesso"],
        "sucesso",
        "success"
      );
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }
  async fetchPurchases() {
    try {
      let purchases = await apiGet(process.env.REACT_APP_PURCHASE_ENDPOINT);

      this.setState({
        purchases,
        purchase: {},
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }
  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleSelectedPurchaseRow(row) {
    let selectedRow = clone(row);

    this.setState({
      purchase: selectedRow,
    });
  }
  handleSelectedPurchaseItemRow(row) {
    let selectedRow = clone(row);

    console.log(selectedRow);
    this.setState({
      selectedTrade: true,
      purchaseItem: selectedRow,
    });
  }

  handleClear() {
    this.setState({
      selectedTrade: false,
      purchaseItem: {},
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
            Minhas compras
          </Card.Title>
          <SSAlert
            showAlert={this.state.alert.show}
            messages={this.state.alert.messages}
            variant={this.state.alert.variant}
            title={this.state.alert.title}
          />
          <hr />
          <h3>Suas Compras</h3>
          <PurchaseTable
            data={this.state.purchases}
            onRowSelect={this.handleSelectedPurchaseRow.bind(this)}
          />
          <hr />
          <h3>Dados da compra</h3>
          <PurchaseControlForm root="purchase" purchase={this.state.purchase} />

          <hr />
          <h3>Itens da compra</h3>
          <PurchaseItemsTable
            data={this.state.purchase.purchaseItems}
            onRowSelect={this.handleSelectedPurchaseItemRow.bind(this)}
          />
          <SSForm
            onSubmit={this.handleRequestTrade.bind(this)}
            customSubmitText={"Solicitar Devolução"}
            disabled={!this.state.selectedTrade}
            onCancel={this.handleClear.bind(this)}
          >
            <PurchaseItemDevolutionForm
              root="purchaseItem"
              purchaseItem={this.state.purchase.purchaseItem}
            />
            <hr />
          </SSForm>
        </Card.Body>
      </SSFormLayout>
    );
  }
}
