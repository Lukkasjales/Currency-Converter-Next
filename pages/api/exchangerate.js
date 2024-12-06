import axios from "axios";

export default async function handler(req, res) { // 'handler' é nomenclatura padrão
    const { baseCurrency, targetCurrency, amount } = req.query;
    
    try {
        const response = await axios.get(
            `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/${baseCurrency}/${targetCurrency}/${amount}`
        )
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Erro ao buscar dados da API ExchangeRate: ", error);
        res.status(500).json({ error: "Erro ao buscar dados de câmbio"})
    }
}