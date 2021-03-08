import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSAlert from "../../components/alert/SSalert";
import CreditCardForm from "../../components/creditCard/creditCardForm";
import CreditCardTable from "../../components/creditCard/creditCardTable";
import SSForm from "../../components/form/SSForm";
import SSFormLayout from "../../layout/SSFormLayout";
import { apiDelete, apiGet, apiPost, apiPut } from "../../utils/api/api-utils";
import { alertMessageUtil, updateStateValue } from "../../utils/utils";
import CreditCardModel from "./CreditCardModel";

export default class ClientCreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      creditCard: new CreditCardModel(),
      isUpdate: false,
      creditCards: [],
    };
  }
  async componentDidMount() {
    try {
      await this.fetchCreditCards();
    } catch (error) {
      this.handleSetMessages(
        ["Não foi possivel carregar os seus cartões"],
        true
      );
    }
  }
  async fetchCreditCards() {
    let creditCards = await apiGet(process.env.REACT_APP_CREDIT_CARD_ENDPOINT);

    this.setState({
      creditCards,
    });
  }
  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleSelectedRow(row) {
    let selectedRow = clone(row);
    this.setState({
      creditCard: selectedRow,
      isUpdate: true,
    });
  }
  handleSetMessages(messages = [], show = false, title = "", variant = "") {
    this.setState(() => ({
      alert: alertMessageUtil(messages, show, title, variant),
    }));
  }
  handleClear() {
    this.setState({
      creditCard: new CreditCardModel(),
      isUpdate: false,
    });
  }

  async handleDelete() {
    if (!this.state.isUpdate) {
      return;
    }

    const creditCard = clone(this.state.creditCard);

    try {
      await apiDelete(
        process.env.REACT_APP_CREDIT_CARD_ENDPOINT,
        creditCard.id
      );

      this.handleClear();
      this.handleSetMessages(
        [`Cartão  ${creditCard.name} excluido com sucesso`],
        true,
        "Sucesso",
        "success"
      );
      await this.fetchCreditCards();
    } catch (error) {
      if (error.response?.data?.error) {
        this.handleSetMessages(error.response?.data?.error.split(";;"), true);
        return;
      }
      if (error.response?.data?.message) {
        this.handleSetMessages(
          [`${error.response?.data.error} : ${error.response?.data.message}`],
          true
        );

        return;
      }
    }
  }
  async handleSubimit(event) {
    event.preventDefault();
    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
      this.setState(() => ({
        formError: "true",
      }));
      return;
    }
    this.setState(() => ({
      formError: "false",
    }));

    const creditCard = clone(this.state.creditCard);

    try {
      if (this.state.isUpdate) {
        await apiPut(process.env.REACT_APP_CREDIT_CARD_ENDPOINT, creditCard);
        this.handleSetMessages(
          [`Cartão  ${creditCard.name} atualizado com sucesso`],
          true,
          "Sucesso",
          "success"
        );
      } else {
        await apiPost(process.env.REACT_APP_CREDIT_CARD_ENDPOINT, creditCard);
        this.handleSetMessages(
          [`Cartão  ${creditCard.name} salvo com sucesso`],
          true,
          "Sucesso",
          "success"
        );
      }
      this.handleClear();
      await this.fetchCreditCards();
    } catch (error) {
      if (error.response?.data?.error) {
        this.handleSetMessages(error.response?.data?.error.split(";;"), true);

        return;
      }
      if (error.response?.data?.message) {
        this.handleSetMessages(
          `${error.response?.data.error} : ${error.response?.data.message}`,
          true
        );

        return;
      }
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
  render() {
    return (
      <SSFormLayout>
        <Card.Body>
          <Card.Title as="h1">
            <FontAwesomeIcon icon={faCompactDisc} spin className="mr-2" />
            Cadastro de cartões de crédito
          </Card.Title>
          <SSAlert
            showAlert={this.state.alert.show}
            messages={this.state.alert.messages}
            variant={this.state.alert.variant}
            title={this.state.alert.title}
          />
          <hr />

          <SSForm
            onSubmit={this.handleSubimit.bind(this)}
            onCancel={this.handleClear.bind(this)}
            onDelete={this.handleDelete.bind(this)}
            allowDelete={this.state.isUpdate}
            customSubmitText={this.state.isUpdate ? "Atualizar" : ""}
          >
            <CreditCardForm
              root="creditCard"
              creditCard={this.state.creditCard}
              onChange={this.handleInputChange.bind(this)}
            />
            <hr />
          </SSForm>
          <hr />
          <h3>Seus cartões</h3>
          <CreditCardTable
            data={this.state.creditCards}
            onRowSelect={this.handleSelectedRow.bind(this)}
          />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
