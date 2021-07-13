import axios from 'axios';
import {http} from '../utils/http.util';

const CancelToken = axios.CancelToken;
let cancel;

export function fetchData(group) {
  return http.get(`/${group}`)
    .then((response) => response.data)
    .catch((error) => error);
}

export function postFormProduct(data) {
  return http.post(`/products`, data,{headers: {
    'Content-Type': 'multipart/form-data'
  }})
    .then((response) => response.data)
    .catch((error) => error);
}

export function editFormProduct(id, data) {
  return http.patch(`/products/${id}`, data)
    .then((response) => response.data)
    .catch((error) => error);
}

export function deleteFormProduct(id) {
  return http.delete(`/products/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
}
export function postFormOrder(data) {
  return http.post(`/orders`, data,{headers: {
    'Content-Type': 'multipart/form-data'
  }})
    .then((response) => response.data)
    .catch((error) => error);
}