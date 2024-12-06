import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY,
      },
      params: {
        start: 1,
        limit: 10,
        convert: "USD",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response.data);
    res.status(500).json({ error: "Erro ao buscar dados da CoinMarketCap" });
  }
}
