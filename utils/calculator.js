const convertCurrency = (amount, usd, inr) => ((amount * inr) / usd).toFixed(2);

export { convertCurrency };
