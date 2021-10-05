import axios from 'axios';
import { IEX_PUBLISHABLE } from '../constants/keys.js';

const root = async url => {
  try {
    const response = await axios.get(url);
    return { success: true, ...response.data };
  } catch (e) {
    console.log(e.response.status, e.response.data);
    console.log(e.message);
    return { success: false };
  }
};

const getStockPrice = symbol =>
  root(
    `https://sandbox.iexapis.com/stable/stock/${symbol}/price?token=${IEX_PUBLISHABLE}`
  );

const getCompanyDetails = symbol =>
  root(
    `https://sandbox.iexapis.com/stable/stock/${symbol}/company?token=${IEX_PUBLISHABLE}`
  );

const getQuote = symbol =>
  root(
    `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${IEX_PUBLISHABLE}`
  );

export { getStockPrice, getCompanyDetails, getQuote };
