import axios from "axios";
import { API_KEY } from "./API_KEY";

const baseInstance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  method: 'GET',
  headers: { 'accept': 'application/json', 'x-cg-demo-api-key':  API_KEY }
});

export default baseInstance;