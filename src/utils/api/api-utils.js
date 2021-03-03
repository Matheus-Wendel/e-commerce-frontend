import axios from "axios";
const querystring = require("querystring");

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const host = process.env.REACT_APP_SOUND_SOURCE_API;

export async function apiGet(endpoint, params = null) {
  const loggedUser = JSON.parse(localStorage.getItem("user")) ?? "";
  let headers = {};
  if (loggedUser) {
    headers = {
      Authorization: loggedUser.Authorization,
    };
  }
  try {
    let requestUrl = host + endpoint;
    if (params) {
      requestUrl = `${requestUrl}?${querystring.stringify(params)}`;
    }
    let response = await api.get(requestUrl, { headers });
    if (response.status >= 400) {
      throw new Error(response.data);
    }
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
export async function apiPost(endpoint, data = {}) {
  const loggedUser = JSON.parse(localStorage.getItem("user")) ?? "";
  let headers = {};
  if (loggedUser) {
    headers = {
      Authorization: loggedUser.Authorization,
    };
  }
  try {
    let requestUrl = host + endpoint;

    let response = await api.post(requestUrl, JSON.stringify(data), {
      headers,
    });
    if (response.status >= 400) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function apiLogin(data = {}) {
  try {
    let requestUrl = host + process.env.REACT_APP_LOGIN_ENDPOINT;

    let response = await api.post(requestUrl, JSON.stringify(data));
    if (response.status >= 400) {
      throw response.data;
    }
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    throw error;
  }
}

// export async function ospApiGet(endpoint, queryParams = null) {
//   const options = {
//     method: "GET",
//     headers: { "Content-Type": "application/json", Authorization: token },
//   };

//   // resource url
//   let apiUrl = `${ospApiDomain}${endpoint}`;
//   // add query parameter if exists
//   apiUrl += queryParams ? `?${queryParams}` : "";
//   // make request and wait promisse resolve
//   const res = await fetch(apiUrl, options);
//   const data = await res.json();
//   if (res.ok) {
//     return data;
//   }
//   if (res.status >= 400 && data.hasOwnProperty("message")) {
//     const { message } = data;
//     throw Error(message);
//   }
//   throw new Error(res);
// }
