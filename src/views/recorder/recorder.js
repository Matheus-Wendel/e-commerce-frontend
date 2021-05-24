import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSForm from "../../components/form/SSForm";
import SSFormLayout from "../../layout/SSFormLayout";
import {
  alertMessageUtil,
  handleErrorMessage,
  handleSetAlert,
  updateStateValue,
} from "../../utils/utils";
import { apiDelete, apiGet, apiPost, apiPut } from "../../utils/api/api-utils";
import clone from "clone";
import SSAlert from "../../components/alert/SSalert";
import RecorderForm from "../../components/recorder/recorderForm";
import RecorderTable from "../../components/recorder/recorderTable";

export default class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: alertMessageUtil(),
      recorders: [],
      recorder: {
        name: "",
      },
      isUpdate: false,
    };
  }
  async componentDidMount() {
    await this.fetchRecorders();
  }
  async fetchRecorders() {
    try {
      let recorders = await apiGet(process.env.REACT_APP_RECORDER_ENDPOINT);

      this.setState({
        recorders,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const { recorder, isUpdate } = this.state;
      if (isUpdate) {
        await apiPut(process.env.REACT_APP_RECORDER_ENDPOINT, recorder);
        handleSetAlert(
          this.setState.bind(this),
          ["Gravadora atualizada com sucesso"],
          "sucesso",
          "success"
        );
      } else {
        await apiPost(process.env.REACT_APP_RECORDER_ENDPOINT, recorder);
        handleSetAlert(
          this.setState.bind(this),
          ["Gravadora cadastrada com sucesso"],
          "sucesso",
          "success"
        );
      }
      this.handleClear();
      await this.fetchRecorders();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleDelete() {
    try {
      const { recorder } = this.state;

      await apiDelete(process.env.REACT_APP_RECORDER_ENDPOINT, recorder.id);
      handleSetAlert(
        this.setState.bind(this),
        ["Gravadora excluida com sucesso"],
        "sucesso",
        "success"
      );

      this.handleClear();
      await this.fetchRecorders();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  handleSelectedRow(row) {
    let selectedRow = clone(row);

    console.log(selectedRow);
    this.setState({
      isUpdate: true,
      recorder: selectedRow,
    });
  }
  handleClear() {
    this.setState({
      isUpdate: false,
      recorder: {},
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
            Cadastro de Gravadoras
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
            onDelete={this.handleDelete.bind(this)}
            allowDelete={this.state.isUpdate}
            customSubmitText={this.state.isUpdate ? "Atualizar" : ""}
          >
            <RecorderForm
              root="recorder"
              recorder={this.state.recorder}
              onChange={this.handleInputChange.bind(this)}
            />
            <hr />
          </SSForm>
          <hr />
          <h3>Gravadoras cadastrados</h3>
          <RecorderTable
            data={this.state.recorders}
            onRowSelect={this.handleSelectedRow.bind(this)}
          />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
