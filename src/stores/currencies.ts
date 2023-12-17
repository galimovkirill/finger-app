import { http } from '@/modules/http';
import { Currency } from '@/types/currency/currency';
import { defineStore } from 'pinia';

interface State {
    currencies: Currency[];
}

export const useCurrenciesStore = defineStore('currencies', {
    state: (): State => ({
        currencies: []
    }),

    actions: {
        async getCurrencies() {
            const response = await http.get<Currency[]>('/currencies/all');
            this.currencies = response.data;
        }
    }
});
