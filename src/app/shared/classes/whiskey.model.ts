import { IWhiskey } from "../interfaces/whiskey.interface";

export class Whiskey implements IWhiskey {
    constructor(
        public id: number | string,
        public name: string,
        public urlName: string,
        public descriptionTitle: string,
        public description: string,
        public image: string,
        public aroma: string,
        public taste: string,
        public afterTaste: string,
        public weight: string,
        public price: number,
        public video: string,
        public count: number = 1
    ) { }
}