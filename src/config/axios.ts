import axios, { AxiosRequestConfig } from 'axios';

const Axios = axios.create({ baseURL: 'http://localhost:3000/' });

const axiosFetcher = (url: string, config?: AxiosRequestConfig) =>
  Axios.get(url, config).then(res => res.data);

export { Axios, axiosFetcher };
