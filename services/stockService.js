import axios from 'axios';
import { IEX_PUBLISHABLE } from '../constants/keys.js';

const root = async url => {
  url += `?token=${IEX_PUBLISHABLE}`;
  try {
    const response = await axios.get(url);
    return { success: true, data: response.data };
  } catch (e) {
    console.log(e.response.status, e.response.data);
    console.log(e.message);
    return { success: false };
  }
};

const getStockPrice = symbol =>
  root(`https://sandbox.iexapis.com/stable/stock/${symbol}/price`);

const getCompanyDetails = symbol =>
  root(`https://sandbox.iexapis.com/stable/stock/${symbol}/company`);

const getQuote = symbol =>
  root(`https://sandbox.iexapis.com/stable/stock/${symbol}/quote`);

const getChartDataForOneDay = symbol =>
  root(`https://sandbox.iexapis.com/stable/stock/${symbol}/intraday-prices`);

const getChartData = (symbol, range = '1m') =>
  root(`https://sandbox.iexapis.com/stable/stock/${symbol}/chart/${range}`);

export {
  getStockPrice,
  getCompanyDetails,
  getQuote,
  getChartDataForOneDay,
  getChartData,
};
