"use server";
import { API_URL } from "@/configs/global";
import { cookieName } from "@/lib/auth/constant";
import { ApiError } from "@/types/http-errors.interface";
import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
// import { getCookie } from "cookies-next/client";
import { errorHandler, networkErrorStrategy } from "./http-error-strategies";
import { cookies } from "next/headers";
// import { getCookie, getCookies, hasCookie } from "cookies-next/server";

const httpService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpService.interceptors.request.use(
  async (config: any) => {
    // const token = getCookie(cookieName);
    // console.log("token", token);
    const cookieStore = cookies();
    // const token = await getCookie("USER_SESSION");
    // const token = localStorage.getItem("USER_SESSION");
    const token = cookieStore.get(cookieName)?.value;

    console.log("tttttttttttt", token);
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// httpService.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error?.response) {
//       const statusCode = error?.response?.status;
//       if (statusCode >= 400) {
//         const errorData: ApiError = error.response?.data;

//         errorHandler[statusCode](errorData);
//       }
//     } else {
//       networkErrorStrategy();
//     }
//   }
// );

async function apiBase<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse = await httpService(url, options);
  return response.data as T;
}

async function getData<T>(
  url: string,
  headers?: AxiosRequestHeaders,
  responseType: AxiosRequestConfig["responseType"] = "json"
): Promise<T> {
  const options: AxiosRequestConfig = {
    headers: headers,
    method: "GET",
    responseType: responseType,
  };
  return await apiBase<T>(url, options);
}

async function postData<TModel, TResult>(
  url: string,
  data: TModel,
  headers?: AxiosRequestHeaders
): Promise<TResult> {
  const options: AxiosRequestConfig = {
    method: "POST",
    headers: headers,
    data: JSON.stringify(data),
  };

  return await apiBase<TResult>(url, options);
}

async function updateData<TModel, TResult>(
  url: string,
  data: TModel,
  headers?: AxiosRequestHeaders
): Promise<TResult> {
  const options: AxiosRequestConfig = {
    method: "PUT",
    headers: headers,
    data: JSON.stringify(data),
  };

  return await apiBase<TResult>(url, options);
}

async function deleteData(
  url: string,
  headers?: AxiosRequestHeaders
): Promise<void> {
  const options: AxiosRequestConfig = {
    method: "DELETE",
    headers: headers,
  };

  return await apiBase(url, options);
}

export { deleteData, getData, postData, updateData };
