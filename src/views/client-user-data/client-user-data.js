import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Card } from "react-bootstrap";
import AddressForm from "../../components/address/addressForm";
import SSAlert from "../../components/alert/SSalert";
import SignUpForm from "../../components/client/signUpForm";
import SSForm from "../../components/form/SSForm";
import SSFormLayout from "../../layout/SSFormLayout";
import { apiDelete, apiPut } from "../../utils/api/api-utils";
import {
  alertMessageUtil,
  getLoggedUser,
  handleErrorMessage,
  updateStateValue,
} from "../../utils/utils";
import ClientUserDataModel from "./ClientUserDataModel";
export default class ClientUserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),

      client: new ClientUserDataModel(),
      oldClient: new ClientUserDataModel(),
    };
  }
  async componentDidMount() {
    try {
      let user = await getLoggedUser();
      user.billingAddress.state = { id: user.billingAddress.city.state.id };
      delete user.cart;
      delete user.creditCards;
      delete user.deliveryAddresses;
      delete user.purchases;
      delete user.ranking;
      delete user.active;
      user.password = "";
      user.passwordConfirmation = "";

      this.setState({
        client: user,
        oldClient: clone(user),
      });
    } catch (error) {
      this.handleSetMessages(
        ["Não foi possivel carregar os dados de usuário"],
        true
      );
    }
  }

  async handleDelete() {
    try {
      await apiDelete(
        process.env.REACT_APP_CLIENT_ENDPOINT,
        this.state.client.id
      );
      window.location.href = "/login?status=desativado";
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
  handleSetMessages(messages = [], show = false, title = "", variant = "") {
    this.setState(() => ({
      alert: alertMessageUtil(messages, show, title, variant),
    }));
  }
  handleClear() {
    const { oldClient } = this.state;

    this.setState({
      client: clone(oldClient),
    });
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

    const client = clone(this.state.client);
    console.log(client);
    try {
      if (client.user.password !== client.user.passwordConfirmation) {
        throw new Error("Senhas não coincidem");
      }
      await apiPut(process.env.REACT_APP_CLIENT_ENDPOINT, client);

      window.location.href = "/login?status=atualizado";
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
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
            Atualização de informações
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
            customSubmitText={"Atualizar"}
            onDelete={this.handleDelete.bind(this)}
            allowDelete={true}
            customDeleteText={"Excluir conta"}
          >
            <h4>Dados pessoais</h4>
            <SignUpForm
              root="client"
              client={this.state.client}
              onChange={this.handleInputChange.bind(this)}
            />
            <hr />
            <h4>Endereço de cobrança</h4>
            <AddressForm
              root="client.billingAddress"
              address={this.state.client.billingAddress}
              onChange={this.handleInputChange.bind(this)}
            />
            <hr />
          </SSForm>
          <hr />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
