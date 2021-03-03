export default class SignUp {
  constructor() {
    this.name = "";
    this.cpf = "";
    this.user = { email: "", password: "" };
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
    this.deliveryAddresses = {
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
