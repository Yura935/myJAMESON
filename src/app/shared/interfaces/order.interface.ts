import { IWhiskey } from "./whiskey.interface";

export interface IOrder {
    products: Array<IWhiskey>;
    firstName: string;
    phone: string;
    adress: string;
    totalPrice: number;
    comments: string;
    date: Date;
}