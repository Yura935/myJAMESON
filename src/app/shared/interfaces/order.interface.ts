import { IDrink } from "./drink.interface";
import { IWhiskey } from "./whiskey.interface";

export interface IOrder {
    whiskeys: Array<IWhiskey>;
    drinks: Array<IDrink>;
    firstName: string;
    phone: string;
    city: string;
    street: string;
    house: string;
    totalPrice: number;
    comments: string;
    date: Date;
}