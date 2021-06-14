export default class ClientUserDataModel {
  constructor() {
    this.name = "";
    this.cpf = "";
    this.user = { email: "", password: "", passwordConfirmation: "" };
    this.genre = "";
    this.telephone = "";
    this.billingAddress = {
      description: "",
      number: "",
      addressType: "",
      addressDescription: "",
      district: "",
      observations: "",
      city: { id: "" },
      state: { id: "" },
    };
  }
}
