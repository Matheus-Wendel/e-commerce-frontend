import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Card } from "react-bootstrap";
import AddressForm from "../../components/address/addressForm";
import AddressTable from "../../components/address/addressTable";
import SSAlert from "../../components/alert/SSalert";
import SSForm from "../../components/form/SSForm";
import GenreTable from "../../components/genre/genreTable";
import PricingForm from "../../components/pricing/pricingForm";
import PricingTable from "../../components/pricing/pricingTable";
import SSFormLayout from "../../layout/SSFormLayout";
import { apiPost, apiGet, apiPut, apiDelete } from "../../utils/api/api-utils";
import { alertMessageUtil, updateStateValue } from "../../utils/utils";
import PricingModel from "./PricingModel";

export default class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      pricing: new PricingModel(),
      isUpdate: false,
      adresses: [],
    };
  }
  async componentDidMount() {
    // try {
    //   await this.fetchAdresses();
    // } catch (error) {
    //   this.handleSetMessages(
    //     ["Não foi possivel carregar os seus endereços"],
    //     true
    //   );
    // }
  }

  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleSelectedRow(row) {
    let selectedRow = clone(row);
    this.setState({
      pricing: selectedRow,
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
      pricing: new PricingModel(),
      isUpdate: false,
    });
  }

  async handleDelete() {
    if (!this.state.isUpdate) {
      return;
    }

    const deliveryAddress = clone(this.state.deliveryAddress);

    try {
      await apiDelete(
        process.env.REACT_APP_ADDRESS_ENDPOINT,
        deliveryAddress.id
      );

      this.handleClear();
      this.handleSetMessages(
        [
          `Endereço de entrega ${deliveryAddress.description} excluido com sucesso`,
        ],
        true,
        "Sucesso",
        "success"
      );
      await this.fetchAdresses();
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

    const deliveryAddress = clone(this.state.deliveryAddress);

    try {
      if (this.state.isUpdate) {
        await apiPut(process.env.REACT_APP_ADDRESS_ENDPOINT, deliveryAddress);
        this.handleSetMessages(
          [
            `Endereço de entrega ${deliveryAddress.description} atualizado com sucesso`,
          ],
          true,
          "Sucesso",
          "success"
        );
      } else {
        await apiPost(process.env.REACT_APP_ADDRESS_ENDPOINT, deliveryAddress);
        this.handleSetMessages(
          [
            `Endereço de entrega ${deliveryAddress.description} salvo com sucesso`,
          ],
          true,
          "Sucesso",
          "success"
        );
      }
      this.handleClear();
      await this.fetchAdresses();
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
            Cadastro de grupos de precificação
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
            <PricingForm
              root="pricing"
              pricing={this.state.pricing}
              onChange={this.handleInputChange.bind(this)}
            />
            <hr />
          </SSForm>
          <hr />
          <h3>Precificações cadastradas</h3>
          <PricingTable onRowSelect={this.handleSelectedRow.bind(this)} />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
