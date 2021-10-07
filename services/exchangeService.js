import axios from 'axios';
import { EXCHANGE_ACCESS_KEY } from '../constants/keys';

const getLatestExchangeRate = async () => {
  const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${EXCHANGE_ACCESS_KEY}`;

  try {
    const response = await axios.get(url);
    const data = { USD: response.data.rates.USD, INR: response.data.rates.INR };
    return { success: true, data };
  } catch (e) {
    console.log(e.response.status, e.response.data);
    console.log(e.message);
    return { success: false };
  }
};

export { getLatestExchangeRate };
