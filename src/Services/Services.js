import { BaseURL } from "../API";
import axios from "axios";

export const POSTCALL = (path, payload, token = "") => {
  let data = JSON.stringify(payload);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BaseURL}${path}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

export const GETCALL = (path, token) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BaseURL}${path}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
