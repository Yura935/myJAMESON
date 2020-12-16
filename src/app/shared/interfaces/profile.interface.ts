import { IOrder } from "./order.interface";

export interface IProfile {
    email: string;
    firstName: string;
    phone: string;
    city: string;
    street: string;
    house: string;
    orders: Array<IOrder>;
    role: string;
}
