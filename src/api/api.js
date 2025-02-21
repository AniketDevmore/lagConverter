import axios from "axios";
// import { showErrorToast } from "../utils/ToastMessages/ToastMessages";
const timeOut = 35000;

// axiosInstance for API With Loader
const axiosInstance = axios.create();   

// Axios Request
axiosInstance.interceptors.request.use(
  async (config) => {
    const netInfo = navigator.onLine ? "Online" : "Offline";
    if (netInfo !== "Online") {
      showNetworkError();
      throw new Error("No network connection");
    }
    return config;
  },
  (error) => {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

// Axios Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      console.log(response.status);
    } else {
      return response.data;
    }
  },
  async (error) => {
    let config = error?.config;
    if (!config || !config.retry) {
      return Promise.reject(error);
    }
    config.__retryCount = config.__retryCount || 0;
    if (config?.__retryCount >= config?.retry) {
      return Promise.reject(error);
    }
    config.__retryCount += 1;
    let backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 1);
    });
    // retry the request
    return backoff.then(function () {
      return axiosInstance(config);
    });
  }
);

//Get Request API call
export const doGet = (url, params, headers) => {
  return axiosInstance
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}),
      },
      params: params,
      timeout: timeOut,
    })
    .catch((error) => {
      console.log("doGet--error message", error?.response?.data);
    });
};

//Post Request API call
export const doPost = async (
  url,
  body,
  headers,
  showLoader = true,
  customTimeout = false
) => {
  return new Promise((resolve, reject) => {
    const apiHeader = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(headers || {}),
      },
    };

    if (!customTimeout) {
      apiHeader["timeout"] = timeOut;
    }

    axiosInstance
      .post(url, body, apiHeader)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log("PoSTError =>", error);
        reject(error);
      });
  });
};

//Patch Request API call
export const doPatch = async (url, body, headers) => {
  return axiosInstance
    .patch(url, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(headers || {}),
      },
      timeout: timeOut,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error do patch ==> ", error?.response?.data);
      // showErrorToast("Something went wrong, Try again later!");
      return error;
    });
};

//Put Request API call
export const doPut = (url, body, headers) => {
  return axiosInstance
    .put(url, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(headers || {}),
      },
      timeout: timeOut,
    })
    .catch((error) => {
      throw error.response;
    });
};

//Delete Request API call
export const doDelete = (url, body, headers) => {
  return axiosInstance
    .delete(url, {
      data: body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(headers || {}),
      },
      timeout: timeOut,
    })
    .catch(() => {
      console.log("Something went wrong, Try again later!");
    });
};

/**
 * The function `showNetworkError` displays a message indicating no internet connection.
 */
const showNetworkError = () => {
  console.log("No internet connection, please try again later!")
};
