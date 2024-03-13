export interface CreditInterface {
    client: {
        id: number;
        FirstName: string;
        LastName: string;
        Email: string;
        CIN: string;
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
