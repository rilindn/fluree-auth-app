import axios from 'axios';

const flureeApiUrl = process.env.FLUREE_API_URL as string;
const flureeToken = process.env.FLUREE_TOKEN as string;

export const FlureeClient = axios.create({
  baseURL: flureeApiUrl,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Authorization": `${flureeToken}`
  }
});
