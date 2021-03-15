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
import { alertMessageUtil, updateStateValue } from "../../utils/utils";
import CreditCardModel from "./CreditCardModel";

export default class Exchanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      purchaseItems: [],
    };
  }
  async componentDidMount() {
    // try {
    //   await this.fetchCreditCards();
    // } catch (error) {
    //   this.handleSetMessages(
    //     ["Não foi possivel carregar os seus cartões"],
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
      purchaseItems: selectedRow.purchaseItems,
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
            onSubmit={this.handleInputChange.bind(this)}
            customSubmitText={"Aceitar solicitação"}
            disabled
          >
            <PurchaseItemDevolutionForm
              root="purchaseItem"
              purchaseItem={this.state.purchaseItem}
            />
            <hr />
          </SSForm>
          <hr />
          <h3>Solicitações de troca</h3>
          <ExchangesTable onRowSelect={this.handleSelectedRow.bind(this)} />
          <hr />
          <h3>Trocas Aceitas</h3>
          <SSForm
            onSubmit={this.handleInputChange.bind(this)}
            customSubmitText={"Finalizar Troca"}
            disabled
          >
            <Form.Row>
              <Form.Group as={Col} md={5}>
                <SSSelect
                  label="Retornar ao estoque?"
                  name={`employee.permission`}
                  items={[
                    { id: "S", description: "Sim" },
                    { id: "N", description: "Não" },
                  ]}
                  value={this.state?.employee?.permission || ""}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} md={5}>
                <SSSelect
                  label="Selecione o estoque"
                  name={`employee.permission`}
                  items={[
                    { id: "EMPLOYEE", description: "Funcionario" },
                    { id: "SALES_MANAGER", description: "Gerente de vendas" },
                  ]}
                  value={this.state?.employee?.permission || ""}
                  onChange={this.handleInputChange}
                  disabled
                />
              </Form.Group>
            </Form.Row>
            <hr />
          </SSForm>
          <hr />
          <h3>Trocas Aceitas</h3>
          <ExchangesTable onRowSelect={this.handleSelectedRow.bind(this)} />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
