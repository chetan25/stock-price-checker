import axios from 'axios';
import { formatCurrency } from 'Services/./helper';

const config = {
    apiKey: process.env.NODE_ENV === 'development' ? process.env.API_KEY_LOCAL : process.env.API_KEY_PROD,
    apiUrl: process.env.NODE_ENV === 'development' ? 'https://sandbox.iexapis.com/stable/stock/' : 'https://cloud.iexapis.com/stable/stock/',
};

export interface IStockInfo {
    symbol: string;
    description: string;
    companyName: string;
    price: string;
}

class SearchService {
    static getStockDescription(value: string) {
        const descUrl = `${config.apiUrl}${value}/company?token=${config.apiKey}`;

        return axios.get(descUrl);
    };

    static getStockPrice(value: string) {
        const priceUrl = `${config.apiUrl}${value}/quote/latestPrice?token=${config.apiKey}`;

        return axios.get(priceUrl);
    }
    static searchSymbol(value: string): Promise<IStockInfo> {
        return axios.all([this.getStockDescription(value), this.getStockPrice(value)])
            .then(axios.spread(function(desc, price) {
                return {
                    symbol: desc.data.symbol,
                    companyName: desc.data.companyName,
                    description: desc.data.description,
                    price: formatCurrency(price.data),
                }
            }));
    }
}

export default SearchService;