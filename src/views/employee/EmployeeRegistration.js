import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clone from "clone";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSAlert from "../../components/alert/SSalert";
import EmployeeForm from "../../components/employee/employeeForm";
import EmployeeTable from "../../components/employee/employeeTable";
import SSForm from "../../components/form/SSForm";
import SSFormLayout from "../../layout/SSFormLayout";
import { apiGet, apiPost, apiPut } from "../../utils/api/api-utils";
import {
  alertMessageUtil,
  handleErrorMessage,
  handleSetAlert,
  updateStateValue,
} from "../../utils/utils";
import Employee from "./EmployeeModel";

export default class EmployeeRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: new Employee(),
      employees: [],
      isUpdate: false,
      alert: alertMessageUtil(),
    };
  }
  async componentDidMount() {
    await this.fetchEmployees();
  }
  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const { employee, isUpdate } = this.state;
      console.log(employee);
      if (employee.user.password !== employee.user.passwordConfirmation) {
        throw new Error("Senhas não coincidem");
      }
      if (isUpdate) {
        await apiPut(process.env.REACT_APP_EMPLOYEE_ENDPOINT, employee);
        handleSetAlert(
          this.setState.bind(this),
          ["Funcionario atualizado com sucesso"],
          "sucesso",
          "success"
        );
      } else {
        await apiPost(process.env.REACT_APP_EMPLOYEE_ENDPOINT, employee);
        handleSetAlert(
          this.setState.bind(this),
          ["Funcionario cadastrado com sucesso"],
          "sucesso",
          "success"
        );
      }
      this.handleClear();
      await this.fetchEmployees();
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async fetchEmployees() {
    try {
      let employees = await apiGet(process.env.REACT_APP_EMPLOYEE_ENDPOINT);

      this.setState({
        employees,
      });
    } catch (error) {
      handleErrorMessage(this.setState.bind(this), error);
    }
  }
  handleClear() {
    this.setState({
      employee: new Employee(),
      isUpdate: false,
    });
  }
  handleSelectedRow(row) {
    let selectedRow = clone(row);
    this.setState({
      isUpdate: true,
      employee: selectedRow,
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
            Cadastro de novos funcionarios
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
            <h4>Dados pessoais</h4>
            <EmployeeForm
              root="employee"
              employee={this.state.employee}
              onChange={this.handleInputChange.bind(this)}
              isUpdate={this.state.isUpdate}
            />
          </SSForm>
          <hr />
          <h3>Funcionarios cadastrados</h3>
          <EmployeeTable
            onRowSelect={this.handleSelectedRow.bind(this)}
            data={this.state.employees}
          />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
