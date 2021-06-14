import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSAlert from "../../components/alert/SSalert";
import PromotionalCouponRegistrationForm from "../../components/coupon/PromotionalCouponRegistrationForm";
import SSForm from "../../components/form/SSForm";
import SSFormLayout from "../../layout/SSFormLayout";
import { apiGet, apiPost, apiPut } from "../../utils/api/api-utils";
import {
  alertMessageUtil,
  handleErrorMessage,
  handleSetAlert,
  updateStateValue,
} from "../../utils/utils";
import CouponTable from "../../components/coupon/couponTable";

export default class PromotionalCupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promoCupon: {},
      promoCupons: [],
      isUpdate: false,
      alert: alertMessageUtil(),
    };
  }
  async componentDidMount() {
    await this.fetchPromoCupons();
  }
  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const { promoCupon, isUpdate } = this.state;
      console.log(promoCupon);
      if (isUpdate) {
        await apiPut(process.env.REACT_APP_COUPON_ENDPOINT, promoCupon);
        handleSetAlert(
          this.setState.bind(this),
          ["Cupom atualizado com sucesso"],
          "sucesso",
          "success"
        );
      } else {
        await apiPost(process.env.REACT_APP_COUPON_ENDPOINT, promoCupon);
        handleSetAlert(
          this.setState.bind(this),
          ["Cupom cadastrado com sucesso"],
          "sucesso",
          "success"
        );
      }
      this.handleClear();
      await this.fetchPromoCupons();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async fetchPromoCupons() {
    try {
      let promoCupons = await apiGet(process.env.REACT_APP_COUPON_ENDPOINT, {
        promotional: 1,
      });

      this.setState({
        promoCupons,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }
  handleClear() {
    this.setState({
      promoCupon: {},
      isUpdate: false,
    });
  }
  handleSelectedRow(row) {
    let selectedRow = clone(row);
    this.setState({
      isUpdate: true,
      promoCupon: selectedRow,
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
            Cadastro de cupons promocionais
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
            customSubmitText={this.state.isUpdate ? "Atualizar" : ""}
          >
            <PromotionalCouponRegistrationForm
              root="promoCupon"
              coupon={this.state.promoCupon}
              onChange={this.handleInputChange.bind(this)}
              isUpdate={this.state.isUpdate}
            />
          </SSForm>
          <hr />
          <h3>Cupons cadastrados</h3>
          <CouponTable
            onRowSelect={this.handleSelectedRow.bind(this)}
            data={this.state.promoCupons}
          />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
