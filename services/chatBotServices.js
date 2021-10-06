import * as Location from 'expo-location';
import { getCompanyDetails, getStockPrice } from './stockService';

const commands = `1 - Returns your current address
2 symbol - Returns stock price of symbol
3 symbol - Returns company details of symbol`;

const getAddressString = async () => {
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const { latitude, longitude } = location.coords;

    const postalAddress = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const {
      city,
      country,
      district,
      isoCountryCode,
      postalCode,
      region,
      street,
      subregion,
    } = postalAddress[0];

    return `
City: ${city}
Country: ${country}
District: ${district}
ISO Code: ${isoCountryCode}
Postal Code: ${postalCode}
Region: ${region}
Street: ${street}
Sub Region: ${subregion}`;
  } catch (e) {
    return 'Could not be loaded. Check if location services are available';
  }
};

const getStockPriceString = async symbol => {
  const { success, data } = await getStockPrice(symbol);
  if (!success) {
    return 'Could not be loaded. Check if symbol entered is correct';
  }
  return '$' + data;
};
const getCompanyDetailsString = async symbol => {
  const { success, data } = await getCompanyDetails(symbol);
  if (!success) {
    return 'Could not be loaded. Check if symbol entered is correct';
  }

  const {
    CEO,
    companyName,
    symbol: s,
    country,
    city,
    state,
    address,
    description,
    exchange,
    industry,
    phone,
    website,
    zip,
  } = data;

  return `
CEO: ${CEO}
Company Name: ${companyName}
Symbol: ${s}
Country: ${country}
City: ${city}
State: ${state}
Address: ${address}
Description: ${description}
Exchange: ${exchange}
Industry: ${industry}
Phone: ${phone}
Website: ${website}
ZIP: ${zip}`;
};

export {
  commands,
  getAddressString,
  getStockPriceString,
  getCompanyDetailsString,
};
