import axios from 'axios';
import { IEX_PUBLISHABLE } from '../constants/keys.js';

const getStockPrice = async symbol => {
  try {
    const response = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${symbol}/price?token=${IEX_PUBLISHABLE}`
    );
    console.log('$' + response.data);
    return '$' + response.data;
  } catch (e) {
    console.log(e.response.status, e.response.data);
    console.log(e.message);
  }
};

export { getStockPrice };
