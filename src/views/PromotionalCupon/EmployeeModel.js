export default class Employee {
  constructor() {
    this.id = "";
    this.name = "";
    this.cpf = "";
    this.user = {
      id: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      permission: "",
      active: true,
    };
    this.genre = "";
    this.telephone = "";
  }
}
