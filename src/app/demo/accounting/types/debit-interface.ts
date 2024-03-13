export interface DebitInterface {
    client: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        cin: string;
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
