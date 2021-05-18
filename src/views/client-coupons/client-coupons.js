import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSAlert from "../../components/alert/SSalert";
import CouponTable from "../../components/coupon/couponTable";
import SSFormLayout from "../../layout/SSFormLayout";
import { apiGet } from "../../utils/api/api-utils";
import { alertMessageUtil } from "../../utils/utils";

export default class ClientCoupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      tradeCoupons: [],
    };
  }
  async componentDidMount() {
    await this.fetchTradeCoupons();
  }

  async fetchTradeCoupons() {
    try {
      let tradeCoupons = await apiGet(process.env.REACT_APP_COUPON_ENDPOINT);
      console.log(tradeCoupons);
      this.setState({
        tradeCoupons,
      });
    } catch (error) {
      this.props.errorHandler(error);
    }
  }

  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleSelectedRow(row) {
    let selectedRow = clone(row);
    selectedRow.state = { id: selectedRow.city.state.id };
    this.setState({
      deliveryAddress: selectedRow,
      isUpdate: true,
    });
  }
  handleSetMessages(messages = [], show = false, title = "", variant = "") {
    this.setState(() => ({
      alert: alertMessageUtil(messages, show, title, variant),
    }));
  }

  render() {
    return (
      <SSFormLayout>
        <Card.Body>
          <Card.Title as="h1">
            <FontAwesomeIcon icon={faCompactDisc} spin className="mr-2" />
            Cupons
          </Card.Title>
          <SSAlert
            showAlert={this.state.alert.show}
            messages={this.state.alert.messages}
            variant={this.state.alert.variant}
            title={this.state.alert.title}
          />
          <hr />

          <h3>Seus Coupons</h3>
          <CouponTable data={this.state.tradeCoupons} onRowSelect={() => {}} />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
