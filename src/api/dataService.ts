// src/api/dataService.ts

import axios from 'axios';
import { createUrl } from './makeUrl';
import type { AxiosInstance, AxiosResponse } from 'axios';


const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'X-Client-Url': window.location.href,
  },
});

// Generic error handler
const handleError = (error: any) => {
  // You can customize error handling here
  return Promise.reject(error);
};

export const dataService = {
  get<T>(endpoint: string, params?: object): Promise<AxiosResponse<T>> {
    const url = createUrl(endpoint);
    return axiosInstance
      .get<T>(url, { params })
      .catch(handleError);
  },

  getById<T>(endpoint: string, id: string | number): Promise<AxiosResponse<T>> {
    const url = `${createUrl(endpoint)}/${id}`;
    return axiosInstance.get<T>(url).catch(handleError);
  },

  post<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
    const url = createUrl(endpoint);
    return axiosInstance.post<T>(url, data).catch(handleError);
  },

  put<T>(endpoint: string, id: string | number, data: any): Promise<AxiosResponse<T>> {
    const url = `${createUrl(endpoint)}/${id}`;
    return axiosInstance.put<T>(url, data).catch(handleError);
  },

  delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
    const url = createUrl(endpoint);
    return axiosInstance.delete<T>(url).catch(handleError);
  },
};
