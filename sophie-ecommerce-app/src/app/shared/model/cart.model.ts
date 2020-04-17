export interface ICart {
    id: number;
    product: string;
    amount: number;
    amount_main?: number;
    quantity: number;
    imgUrl: string;
}
