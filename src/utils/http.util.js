import axios from "axios";
import {BASE_URL, TIMEOUT} from '../configs/variables.config';

const http = axios.create();
http.defaults.timeout = TIMEOUT;
http.defaults.baseURL = BASE_URL;

http.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.error(error.response.data);
  return Promise.reject(error);
});


export {http};