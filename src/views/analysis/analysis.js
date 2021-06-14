import { faCompactDisc, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import moment from "moment";
import "moment/locale/pt-br";

import SSAlert from "../../components/alert/SSalert";
import SSFormLayout from "../../layout/SSFormLayout";
import { apiGet } from "../../utils/api/api-utils";
import {
  alertMessageUtil,
  handleErrorMessage,
  updateStateValue,
} from "../../utils/utils";
import { Bar, Line } from "react-chartjs-2";
import SSInput from "../../components/form/SSInput";
//https://stackoverflow.com/questions/16909553/how-to-get-list-of-months-javascript
export default class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      startDate: moment().subtract(7, "days").format("yyyy-MM-DD"),
      endDate: moment().format("yyyy-MM-DD"),
      purchases: [],
      discs: [],
      disc: {},
    };
  }

  // async componentDidMount() {
  //   await this.fetchPurchases();
  //   this.prepareDataSets();
  // }

  // prepareDataSets(year, month) {
  //   moment.locale("pt-br");
  //   const { purchases } = this.state;
  //   return purchases.filter((item) => {
  //     let data = moment(item.purchaseDate, "yyyy-MM-dd-HH:mm");
  //     return data.year() == year && data.month() == month;
  //   });

  //   // [].forEach((item) => {
  //   //   let data = moment(item.purchaseDate, "yyyy-MM-dd-HH:mm");
  //   // });
  //   // const newLocal = moment(purchases[0].purchaseDate, "yyyy-MM-dd-HH:mm");
  //   // newLocal.locale("pt-br");
  //   // const nome = newLocal.format("MMMM");
  //   // console.log(nome);
  // }

  async fetchPurchases() {
    const { startDate, endDate } = this.state;
    try {
      const filter = { startDate, endDate };
      let purchases = await apiGet(
        process.env.REACT_APP_PURCHASE_CONTROL_ENDPOINT,
        filter
      );
      let dataMap = [];
      purchases.forEach((element) => {
        let tempValue = {
          x: moment(element.purchaseDate, "YYYY-MM-DD-hh:mm").format(
            "yyyy-MM-DD"
          ),
          y: 0,
        };
        dataMap.push(tempValue);
      });
      dataMap = dataMap.filter(
        (v, i, a) => a.findIndex((t) => t.x === v.x) === i
      );

      purchases.forEach((element) => {
        const pDate = moment(element.purchaseDate, "YYYY-MM-DD-hh:mm").format(
          "yyyy-MM-DD"
        );
        const dataEntry = dataMap.find((i) => i.x === pDate);
        dataEntry.y += 1;
      });
      // const sortedArray = dataMap.sort(
      //   (a, b) =>
      //     moment(a.x).format("YYYYMMDD") - moment(b.x).format("YYYYMMDD")
      // );

      console.log(dataMap);
      this.setState({
        purchases,
        dataMap,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }
  randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
  render() {
    const { dataMap } = this.state;

    const data = {
      datasets: [
        {
          label: "Compras no dia",
          data: dataMap,
          fill: false,
          borderColor: "red",
        },
      ],
    };

    const options = {
      title: {
        display: true,
        text: "Chart.js Time Scale",
      },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              format: "DD/MM/YYYY",
              tooltipFormat: "ll",
              parser: "YYYY-MM-DD",
            },
            scaleLabel: {
              display: true,
              labelString: "Date",
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "value",
            },
          },
        ],
      },
    };
    // let instert = [];
    // for (let i = 0; i < 1000; i++) {
    //   let ano = Math.floor(Math.random() * 3) + 2019;
    //   let mes = Math.floor(Math.random() * 12) + 1;
    //   if (ano == 2021) {
    //     if (i % 2 == 0) {
    //       continue;
    //     }
    //     mes = Math.floor(Math.random() * 5) + 1;
    //   }
    //   instert.push(
    //     <p>
    //       {`INSERT INTO PURCHASE VALUES(${i}, TIMESTAMP '${ano}-${mes}-24 20:41:21.65', 'PROCESSING', 100.0, NULL, 6, 1, NULL);`}
    //     </p>
    //   );
    // }
    let instert = [];
    for (let i = 0; i < 1000; i++) {
      const date = moment(
        this.randomDate(new Date(2019, 0, 1), new Date())
      ).format("YYYY-MM-DD");

      instert.push(
        <p>
          {`INSERT INTO PURCHASE VALUES(${i}, TIMESTAMP '${date} 20:41:21.65', 'PROCESSING', 100.0, NULL, 6, 1, NULL);`}
        </p>
      );
    }
    return (
      <SSFormLayout>
        <Card.Body>
          <Form.Row className="d-flex align-items-center">
            <Form.Group as={Col} md={3} className="pb-1">
              <SSInput
                label="Data inicial"
                name={`dataInicial`}
                type="date"
                value={this.state?.startDate}
                onChange={(event) => {
                  let { value } = event.target;
                  this.setState({ startDate: value });
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md={3} className="pb-1">
              <SSInput
                label="Data final"
                name={`dataFinal`}
                type="date"
                value={this.state?.endDate}
                onChange={(event) => {
                  let { value } = event.target;
                  this.setState({ endDate: value });
                }}
              />
            </Form.Group>
            <Col md={3} className="pb-2">
              <Button
                type="submit"
                variant="secondary"
                block
                onClick={this.fetchPurchases.bind(this)}
              >
                <FontAwesomeIcon className="mr-2" icon={faSearch} />
                Atualizar
              </Button>
            </Col>
          </Form.Row>
          <Card.Title as="h1">
            <FontAwesomeIcon icon={faCompactDisc} spin className="mr-2" />
            Análise SoundSource
          </Card.Title>
          <SSAlert
            showAlert={this.state.alert.show}
            messages={this.state.alert.messages}
            variant={this.state.alert.variant}
            title={this.state.alert.title}
          />

          <hr />
          <Line data={data} options={options} />
          {/* {instert} */}
        </Card.Body>
      </SSFormLayout>
    );
  }
}
