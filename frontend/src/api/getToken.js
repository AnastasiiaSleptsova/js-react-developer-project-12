import { getApiHost } from "./getApiHost";
import { API_ROUTES } from "./routes";
import axios from "axios";

export const getToken = async ({ username, password, navigate }) => {
  const url = getApiHost() + API_ROUTES.LOGIN;
  try {
    const response = await axios.post(url, { username, password });

    localStorage.setItem("token", response.data.token);
    navigate("/");
  } catch (e) {
    // TODO добавить обработку ошибки
    // setErorMessage("the username or password is incorrect");
  }
};
