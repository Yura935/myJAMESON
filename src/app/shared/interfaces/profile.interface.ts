import { IOrder } from "./order.interface";

export interface IProfile {
    email: string;
    firstName: string;
    lastName: string;
    birth: string;
    phone: string;
    adress: string;
    orders: Array<IOrder>;
    image: string;
    role: string;
}
