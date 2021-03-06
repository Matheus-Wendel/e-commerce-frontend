import { apiGet } from "./api/api-utils";

export function srtGenerator(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function getAuthInfo() {
  return JSON.parse(localStorage.getItem("user")) ?? null;
}
export async function getLoggedUser() {
  let auth = getAuthInfo();
  if (auth?.Permission === "CLIENT") {
    let [usr] = await apiGet(process.env.REACT_APP_CLIENT_ENDPOINT);
    return usr;
  }
  if (auth?.Permission === "EMPLOYEE" || auth?.Permission === "SALES_MANAGER") {
    let [usr] = await apiGet(process.env.REACT_APP_EMPLOYEE_ENDPOINT + "/me");
    return usr;
  }
  return null;
}

export function updateStateValue(state, path, value) {
  path = path.split(".");
  let root = state[path[0]];
  let i = 0;
  for (i; i < path.length - 1; i++) {
    state = state[path[i]];
  }
  state[path[i]] = value;
  return { [path[0]]: root };
}

export function alertMessageUtil(
  messages = [],
  show = false,
  title = "",
  variant = ""
) {
  return {
    messages,
    show,
    title,
    variant,
  };
}
export function handleErrorMessage(setState, error) {
  if (error.response?.data?.error) {
    setState({
      alert: alertMessageUtil(error.response?.data?.error.split(";;"), true),
    });
    return;
  }
  if (error.response?.data?.["Not Found"]) {
    setState({
      alert: alertMessageUtil(["Erro 404, registro não encontrado"], true),
    });
    return;
  }

  if (error.response?.data?.message) {
    setState({
      alert: alertMessageUtil(
        [`${error.response?.data.error} : ${error.response?.data.message}`],
        true
      ),
    });

    return;
  }
  if (error.message) {
    setState({
      alert: alertMessageUtil([error.message], true),
    });
    return;
  }
}
export function handleSetAlert(setState, messages, title, variant) {
  setState({
    alert: alertMessageUtil(messages, true, title, variant),
  });
}

export function getPurchaseStatus(status) {
  switch (status) {
    case "PROCESSING":
      return "EM PROCESSAMENTO";
    case "ACCEPTED":
      return "ACEITO";
    case "IN_TRANSIT":
      return "EM TRANSITO";
    case "DELIVERED":
      return "ENTREGUE";

    default:
      return status;
  }
}
export function getTradeStatus(status) {
  switch (status) {
    case "REQUESTED":
      return "SOLICITADA";
    case "IN_EXCHANGE":
      return "EM TROCA";
    case "FINISHED":
      return "FINALIZADA";

    default:
      return status;
  }
}

export function formatPercentageValue(value) {
  return `${value * 100}%`;
}
