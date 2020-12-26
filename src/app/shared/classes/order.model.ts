import { IOrder } from '../interfaces/order.interface';
import { IWhiskey } from '../interfaces/whiskey.interface';

export class Order implements IOrder {
    public date: Date;
    constructor(
        public products: Array<IWhiskey>,
        public firstName: string,
        public phone: string,
        public adress: string,
        public totalPrice: number,
        public comments: string = '',
    ) {
        this.date = new Date();
    }
}