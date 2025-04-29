// Mock cryptocurrency data
const cryptoData = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 50000,
    market_cap: 950000000000,
    market_cap_rank: 1,
    high_24h: 52000,
    low_24h: 49000,
    price_change_24h: 1000,
    price_change_percentage_24h: 2.04,
    total_volume: 30000000000,
    sparkline_in_7d: {
      price: [48000, 49000, 51000, 50000, 52000, 51000, 50000]
    }
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3000,
    market_cap: 350000000000,
    market_cap_rank: 2,
    high_24h: 3100,
    low_24h: 2900,
    price_change_24h: 50,
    price_change_percentage_24h: 1.69,
    total_volume: 15000000000,
    sparkline_in_7d: {
      price: [2900, 2950, 3050, 3000, 3100, 3050, 3000]
    }
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "Binance Coin",
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    current_price: 400,
    market_cap: 65000000000,
    market_cap_rank: 3,
    high_24h: 410,
    low_24h: 390,
    price_change_24h: 5,
    price_change_percentage_24h: 1.27,
    total_volume: 2000000000,
    sparkline_in_7d: {
      price: [390, 395, 405, 400, 410, 405, 400]
    }
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    current_price: 0.5,
    market_cap: 25000000000,
    market_cap_rank: 4,
    high_24h: 0.52,
    low_24h: 0.48,
    price_change_24h: 0.01,
    price_change_percentage_24h: 2.04,
    total_volume: 1000000000,
    sparkline_in_7d: {
      price: [0.48, 0.49, 0.51, 0.5, 0.52, 0.51, 0.5]
    }
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    current_price: 1.2,
    market_cap: 40000000000,
    market_cap_rank: 5,
    high_24h: 1.25,
    low_24h: 1.15,
    price_change_24h: 0.05,
    price_change_percentage_24h: 4.35,
    total_volume: 3000000000,
    sparkline_in_7d: {
      price: [1.15, 1.18, 1.22, 1.2, 1.25, 1.22, 1.2]
    }
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 100,
    market_cap: 30000000000,
    market_cap_rank: 6,
    high_24h: 105,
    low_24h: 95,
    price_change_24h: 3,
    price_change_percentage_24h: 3.09,
    total_volume: 2000000000,
    sparkline_in_7d: {
      price: [95, 98, 102, 100, 105, 102, 100]
    }
  },
  {
    id: "polkadot",
    symbol: "dot",
    name: "Polkadot",
    image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    current_price: 15,
    market_cap: 15000000000,
    market_cap_rank: 7,
    high_24h: 15.5,
    low_24h: 14.5,
    price_change_24h: 0.3,
    price_change_percentage_24h: 2.04,
    total_volume: 800000000,
    sparkline_in_7d: {
      price: [14.5, 14.8, 15.2, 15, 15.5, 15.2, 15]
    }
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    current_price: 0.1,
    market_cap: 13000000000,
    market_cap_rank: 8,
    high_24h: 0.105,
    low_24h: 0.095,
    price_change_24h: 0.002,
    price_change_percentage_24h: 2.04,
    total_volume: 500000000,
    sparkline_in_7d: {
      price: [0.095, 0.098, 0.102, 0.1, 0.105, 0.102, 0.1]
    }
  },
  {
    id: "avalanche-2",
    symbol: "avax",
    name: "Avalanche",
    image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    current_price: 30,
    market_cap: 9000000000,
    market_cap_rank: 9,
    high_24h: 31,
    low_24h: 29,
    price_change_24h: 0.5,
    price_change_percentage_24h: 1.69,
    total_volume: 400000000,
    sparkline_in_7d: {
      price: [29, 29.5, 30.5, 30, 31, 30.5, 30]
    }
  },
  {
    id: "chainlink",
    symbol: "link",
    name: "Chainlink",
    image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    current_price: 20,
    market_cap: 10000000000,
    market_cap_rank: 10,
    high_24h: 20.5,
    low_24h: 19.5,
    price_change_24h: 0.3,
    price_change_percentage_24h: 1.52,
    total_volume: 600000000,
    sparkline_in_7d: {
      price: [19.5, 19.8, 20.2, 20, 20.5, 20.2, 20]
    }
  }
];

export default cryptoData; 