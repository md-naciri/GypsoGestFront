export interface SaleInterface {
    id: number;
    date: string;
    client: {
      id: number;
      FirstName: string;
      LastName: string;
      Email: string;
      CIN: string;
    };
    items: {
      id: number;
      quantity: number;
      unitPrice: number;
      gypseType: string;
    }[];
}
