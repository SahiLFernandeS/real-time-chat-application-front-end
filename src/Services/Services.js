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

export const GETCALLWITHCANCEL = (path, cancelToken, token = "") => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cancelToken: cancelToken,
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`${BaseURL}${path}`, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          // console.log("Request canceled", error.message);
        }
        reject(error.message);
      });
  });
};

export const PUTCALL = (url, payload, token = "") => {
  let data = JSON.stringify(payload);

  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${BaseURL}${url}`,
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
