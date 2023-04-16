import { BaseURL } from "../API";
import axios from "axios";

export const POSTCALL = (path, payload) => {
  let data = JSON.stringify(payload);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BaseURL}${path}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};
