import axios from 'axios';
import configs from './configs';
const instance = axios.create({
  baseURL: configs.baseUrl
});

export default instance;