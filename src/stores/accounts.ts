import { http } from '@/modules/http';
import { Account, CreateAccountPayload } from '@/types/account/account';
import { defineStore } from 'pinia';

interface State {
    accounts: Account[];
}

export const useAccountsStore = defineStore('accounts', {
    state: (): State => ({
        accounts: []
    }),

    actions: {
        async getAllAccounts() {
            const response = await http.get<Account[]>('/accounts/all');
            this.accounts = response.data;
        },

        async createAccount(payload: CreateAccountPayload) {
            const response = await http.post<Account>('/accounts/create', payload);
            this.accounts.push(response.data);
        }
    }
});
