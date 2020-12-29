import { IDrink } from "../interfaces/drink.interface";

export class Drink implements IDrink {
    constructor(
        public id: number | string,
        public name: string,
        public urlName: string,
        public description: string,
        public imageTitle: string,
        public imageBlog: string,
        public ingredients: Array<string>,
        public preparation: Array<string>
    ) { }
}