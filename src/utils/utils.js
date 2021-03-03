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
