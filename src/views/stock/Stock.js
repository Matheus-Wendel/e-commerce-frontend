import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSAlert from "../../components/alert/SSalert";
import DiscTable from "../../components/disc/discTable";
import SSForm from "../../components/form/SSForm";
import StockForm from "../../components/stock/stockForm";
import StockTable from "../../components/stock/stockTable";
import SSFormLayout from "../../layout/SSFormLayout";
import { apiDelete, apiGet, apiPost, apiPut } from "../../utils/api/api-utils";
import {
  alertMessageUtil,
  handleErrorMessage,
  handleSetAlert,
  updateStateValue,
} from "../../utils/utils";
import StockModel from "./StockModel";

export default class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      stock: new StockModel(),
      stocks: [],
      discs: [],
      disc: {},
    };
  }

  async componentDidMount() {
    await this.fetchDiscs();
  }
  async fetchDiscs() {
    try {
      let discs = await apiGet(process.env.REACT_APP_DISC_ENDPOINT);
      console.log(discs);
      this.setState({
        discs,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const { stock, disc } = this.state;
      stock.disc = { id: disc.id };

      await apiPost(process.env.REACT_APP_STOCK_ENDPOINT, stock);
      handleSetAlert(
        this.setState.bind(this),
        ["Estoque cadastrado com sucesso"],
        "sucesso",
        "success"
      );

      this.handleClear();
      await this.fetchDiscs();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleDelete() {
    try {
      const { stock } = this.state;

      await apiDelete(process.env.REACT_APP_STOCK_ENDPOINT, stock.id);
      handleSetAlert(
        this.setState.bind(this),
        ["Estoque excluido com sucesso"],
        "sucesso",
        "success"
      );

      this.handleClear();
      await this.fetchDiscs();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  handleSelectedDiscRow(row) {
    let selectedRow = clone(row);

    console.log(selectedRow.stock);
    this.setState({
      disc: selectedRow,
      stocks: selectedRow.stock,
    });
  }
  handleSelecteStockRow(row) {}

  async handleInputChange(event) {
    const target = event.target;
    let { name, value } = target;
    const updated = updateStateValue(this.state, name, value);
    await this.setState({
      updated,
    });
  }

  handleClear() {
    this.setState({
      stock: new StockModel(),
      disc: {},
      stocks: [],
    });
  }

  render() {
    return (
      <SSFormLayout>
        <Card.Body>
          <Card.Title as="h1">
            <FontAwesomeIcon icon={faCompactDisc} spin className="mr-2" />
            Controle de estoque
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
            disabled={!this.state.disc?.id}
          >
            <StockForm
              root="stock"
              stock={this.state.stock}
              onChange={this.handleInputChange.bind(this)}
            />
            <hr />
          </SSForm>
          <hr />
          <h3>Discos</h3>
          <DiscTable
            onRowSelect={this.handleSelectedDiscRow.bind(this)}
            data={this.state.discs}
          />
          <hr />
          <h3>Estoque</h3>
          <StockTable
            onRowSelect={this.handleSelecteStockRow.bind(this)}
            data={this.state.stocks}
          />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
