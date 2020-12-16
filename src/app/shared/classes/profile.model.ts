import { IOrder } from '../interfaces/order.interface';
import { IProfile } from '../interfaces/profile.interface';

export class Profile implements IProfile {
    public role: string;
    constructor(
        public email: string,
        public firstName: string = '',
        public phone: string = '',
        public city: string = '',
        public street: string = '',
        public house: string = '',
        public orders: Array<IOrder> = [],
    ){
        this.role = 'user';
    }
}