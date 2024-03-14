export interface SoldInterface {
    client: {
        id: number;
        FirstName: string;
        LastName: string;
        Email: string;
        CIN: string;
    };
    total: number;
    credit: number;
    debit: number;
}

