import { IDrink } from '../interfaces/drink.interface';
import { IOrder } from '../interfaces/order.interface';
import { IWhiskey } from '../interfaces/whiskey.interface';

export class Order implements IOrder {
    public date: Date;
    constructor(
        public whiskeys: Array<IWhiskey>,
        public drinks: Array<IDrink>,
        public firstName: string,
        public phone: string,
        public city: string,
        public street: string,
        public house: string,
        public totalPrice: number,
        public comments: string = '',
    ) {
        this.date = new Date();
    }
}