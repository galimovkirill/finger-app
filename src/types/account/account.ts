export type Account = {
    id: number;
    balance: number;
    currencyCode: string;
    name: string;
};

export type CreateAccountPayload = {
    name: string;
    initialBalance: number;
    currencyCode: string;
}