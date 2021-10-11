const convertUsdToInr = (amount, usd, inr) => ((amount * inr) / usd).toFixed(2);

export { convertUsdToInr };
