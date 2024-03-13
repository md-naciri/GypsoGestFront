export interface DebitInterface {
    client: {
        id: number;
        FirstName: string;
        LastName: string;
        Email: string;
        CIN: string;
    };
    transactions: {
        id: number;
        date: string;
        paymentType: string;
        paymentCode: string;
        amount: number;
    }[];
    listOfReturned: {
        id: number;
        date: string;
        clientId: number;
        paymentCode: string;
    }[];
    debit: number;
}
