import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Card } from "react-bootstrap";
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
//https://stackoverflow.com/questions/16909553/how-to-get-list-of-months-javascript
export default class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      purchases: [],
      discs: [],
      disc: {},
    };
  }

  async componentDidMount() {
    await this.fetchPurchases();
    this.prepareDataSets();
  }

  prepareDataSets(year, month) {
    moment.locale("pt-br");
    const { purchases } = this.state;
    return purchases.filter((item) => {
      let data = moment(item.purchaseDate, "yyyy-MM-dd-HH:mm");
      return data.year() == year && data.month() == month;
    });

    // [].forEach((item) => {
    //   let data = moment(item.purchaseDate, "yyyy-MM-dd-HH:mm");
    // });
    // const newLocal = moment(purchases[0].purchaseDate, "yyyy-MM-dd-HH:mm");
    // newLocal.locale("pt-br");
    // const nome = newLocal.format("MMMM");
    // console.log(nome);
  }

  async fetchPurchases() {
    try {
      let purchases = await apiGet(
        process.env.REACT_APP_PURCHASE_CONTROL_ENDPOINT
      );
      this.setState({
        purchases,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  render() {
    const { purchases } = this.state;
    const data2019 = [];
    for (let i = 0; i < 13; i++) {
      let count = this.prepareDataSets(2019, i).length;
      data2019[i] = count;
    }
    const data2020 = [];
    for (let i = 0; i < 13; i++) {
      let count = this.prepareDataSets(2020, i).length;
      data2020[i] = count;
    }
    const data2021 = [];
    for (let i = 0; i < 13; i++) {
      let count = this.prepareDataSets(2021, i).length;
      data2021[i] = count;
    }
    const data = {
      labels: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      datasets: [
        {
          label: "Nº de compras em 2019",
          data: data2019,
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "Nº de compras em 2020",
          data: data2020,
          backgroundColor: "rgb(54, 162, 235)",
        },
        {
          label: "Nº de compras em 2021",
          data: data2021,
          backgroundColor: "rgb(75, 192, 192)",
        },
      ],
    };

    const options = {
      scales: {
        xAxes: [
          {
            type: "time",
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    let instert = [];
    for (let i = 0; i < 1000; i++) {
      let ano = Math.floor(Math.random() * 3) + 2019;
      let mes = Math.floor(Math.random() * 12) + 1;
      if (ano == 2021) {
        if (i % 2 == 0) {
          continue;
        }
        mes = Math.floor(Math.random() * 5) + 1;
      }
      instert.push(
        <p>
          {`INSERT INTO PURCHASE VALUES(${i}, TIMESTAMP '${ano}-${mes}-24 20:41:21.65', 'PROCESSING', 100.0, NULL, 6, 1, NULL);`}
        </p>
      );
    }
    return (
      <SSFormLayout>
        <Card.Body>
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
          {instert}
        </Card.Body>
      </SSFormLayout>
    );
  }
}
