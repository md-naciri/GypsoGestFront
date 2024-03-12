export interface SaleRequestInterface {
    date: string;
    clientId: number;
    items: {
        quantity: number;
        unitPrice: number;
        gypseType: string;
    }[];
}
