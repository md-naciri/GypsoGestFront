export interface TransactionInterface {
    id: number;
    date: string;
    amount: number;
    paymentType: string;
    paymentCode: string;
    client: {
      id: number;
      firstName: string;
      lastName: string;
      cin: string;
      email: string;
    };
  }