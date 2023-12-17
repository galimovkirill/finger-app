import { useAccountsStore } from '@/stores/accounts';
import { useCurrenciesStore } from '@/stores/currencies';

export const useInitialData = () => {
    const accountsStore = useAccountsStore();
    const currenciesStore = useCurrenciesStore();

    const getInitialData = async () => {
        await Promise.all([accountsStore.getAllAccounts(), currenciesStore.getCurrencies()]);
    };

    return {
        getInitialData
    };
};
