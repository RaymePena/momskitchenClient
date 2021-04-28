import axios from "axios";
import store from "../store/index";
import * as auth from "../Services/AuthService";

export function http() {
  return axios.create({
    baseURL: store.state.apiUrl,
    headers: {
      Authorization: auth.getToken(),
    },
  });
}
