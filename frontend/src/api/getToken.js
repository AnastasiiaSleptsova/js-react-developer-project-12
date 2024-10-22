import { getApiHost } from "./getApiHost";
import { API_ROUTES } from "./routes";
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const getToken = async ({ username, password, onSuccess, onError}) => {

  const url = getApiHost() + API_ROUTES.LOGIN;
  try {
    const response = await axios.post(url, { username, password });

    localStorage.setItem("token", response.data.token);
    onSuccess();
  } catch (e) {

    onError && onError(e.status)
    console.error(e)
    toast.error("Упс. Что-то пошло не так")
  }
};
