import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSAlert from "../../components/alert/SSalert";
import SSForm from "../../components/form/SSForm";
import PurchaseItemDevolutionForm from "../../components/purchases/PurchaseItemDevolutionForm";
import PurchaseItemsTable from "../../components/purchases/PurchaseItemsTable";
import PurchaseTable from "../../components/purchases/PurchaseTable";
import SSFormLayout from "../../layout/SSFormLayout";
import { apiGet } from "../../utils/api/api-utils";
import {
  alertMessageUtil,
  handleErrorMessage,
  handleSetAlert,
  updateStateValue,
} from "../../utils/utils";
import CreditCardModel from "./CreditCardModel";
const querystring = require("querystring");
export default class ClientPurchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      purchaseItems: [],
      purchases: [],
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

  async fetchPurchases() {
    try {
      let purchases = await apiGet(process.env.REACT_APP_PURCHASE_ENDPOINT);

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
      purchaseItems: selectedRow.purchaseItems,
    });
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
            onRowSelect={this.handleSelectedRow.bind(this)}
          />
          <h3>Itens da compra</h3>
          <PurchaseItemsTable
            data={this.state.purchaseItems}
            onRowSelect={this.handleSelectedRow.bind(this)}
          />
          <SSForm
            onSubmit={this.handleInputChange.bind(this)}
            customSubmitText={"Solicitar Devolução"}
            disabled
          >
            <PurchaseItemDevolutionForm
              root="purchaseItem"
              purchaseItem={this.state.purchaseItem}
            />
            <hr />
          </SSForm>
        </Card.Body>
      </SSFormLayout>
    );
  }
}
