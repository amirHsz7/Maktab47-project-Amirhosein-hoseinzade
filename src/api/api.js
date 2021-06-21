import axios from 'axios';
import {http} from '../utils/http.util';

const CancelToken = axios.CancelToken;
let cancel;

export function fetchData(group) {
  return http.get(`/${group}`)
    .then((response) => response.data)
    .catch((error) => error);
}
