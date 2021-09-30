const QuoteModel = {
  avgTotalVolume: {
    type: 'number',
    description: 'Refers to the 30 day average volume.',
    value: '',
  },

  change: {
    type: 'number',
    description:
      'Refers to the change in price between latestPrice and previousClose',
    value: '',
  },

  changePercent: {
    type: 'number',
    description:
      'Refers to the percent change in price between latestPrice and previousClose. For example, a 5% change would be represented as 0.05. You can use the query string parameter displayPercent to return this field multiplied by 100. So, 5% change would be represented as 5.',
    value: '',
  },

  companyName: {
    type: 'string',
    description: 'Refers to the company name.',
    value: '',
  },

  close: {
    type: 'number',
    description:
      'Refers to the 15-minute delayed official close price from the SIP. For Nasdaq-listed stocks, if you do not have UTP authorization, between 4:00 p.m. and 8 p.m. E.T. this field will return the price of the last trade on IEX rather than the SIP closing price.',
    value: '',
  },

  closeTime: {
    type: 'number',
    description:
      'Refers to the official listing exchange time for the close from the SIP. 15 minute delayed.',
    value: '',
  },

  currency: {
    type: 'string',
    description: 'Currency in which the prices are quoted.',
    value: '',
  },

  latestPrice: {
    type: 'number',
    description: `Use this to get the latest price 
    Refers to the latest relevant price of the security which is derived from multiple sources. We first look for an IEX real time price. If an IEX real time price is older than 15 minutes, 15 minute delayed market price is used. If a 15 minute delayed price is not available, we will use the current day close price. If a current day close price is not available, we will use the last available closing price (listed below as previousClose)
    IEX real time price represents trades on IEX only. Trades occur across over a dozen exchanges, so the last IEX price can be used to indicate the overall market price.
    15 minute delayed prices are from all markets using the Consolidated Tape.
    This will not included pre or post market prices.`,
    value: '',
  },

  marketCap: {
    type: 'number',
    description: 'is calculated in real time using latestPrice.',
    value: '',
  },

  open: {
    type: 'number',
    description:
      'Refers to the official open price from the SIP. 15 minute delayed (can be null after 00:00 ET, before 9:45 and weekends).',
    value: '',
  },

  openTime: {
    type: 'number',
    description:
      'Refers to the official listing exchange time for the open from the SIP. 15 minute delayed.',
    value: '',
  },

  peRatio: {
    type: 'number',
    description: 'Refers to the price-to-earnings ratio for the company.',
    value: '',
  },

  symbol: {
    type: 'string',
    description: 'Refers to the stock ticker.',
    value: '',
  },

  volume: {
    type: 'number',
    description:
      'Total volume for the stock, but only updated after market open. To get premarket volume, use latestVolume.',
    value: '',
  },

  ytdChange: {
    type: 'number',
    description:
      'Refers to the price change percentage from start of year to previous close.',
    value: '',
  },
};

export { QuoteModel };
