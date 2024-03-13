export interface CreditInterface {
    client: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        cin: string;
    };
    sales: {
        id: number;
        date: string;
        items: {
            id: number;
            quantity: number;
            unitPrice: number;
            gypseType: string;
        }[];
    }[];
    credit: number;
}
