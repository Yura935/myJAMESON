import { IOrder } from '../interfaces/order.interface';
import { IProfile } from '../interfaces/profile.interface';

export class Profile implements IProfile {
    public role: string;
    constructor(
        public email: string,
        public firstName: string = '',
        public phone: string = '',
        public adress: string = '',
        public image: string = '',
        public orders: Array<IOrder> = [],
    ) {
        this.role = 'user';
    }
}