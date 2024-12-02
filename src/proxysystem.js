const express = require('express');
const axios = require('axios');
const app = express();

export function getCoinPrice(coinSymbol){
    app.get('/crypto', async (req, res) => {
    try {
        const response = await axios.get('https://pro-api.coinmarketcap.com/crypto/v1/cryptocurrency/quotes/latest', {
            headers: {
                'X-CMC_PRO_API_KEY': '347e0c82-186d-4bd9-8e61-26acf379adb6'
            },
            params: {
                symbol: coinSymbol,
                convert: 'USD'
            }
        });
        const data = response.data;
        if (data.status.error_code === 0) {
        return data.data[coinSymbol].quote.USD.price;
        } else {
        throw new Error(data.status.error_message);
    }
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});
}