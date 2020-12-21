export interface IDrink {
    id: number | string;
    name: string;
    urlName: string;
    description: string;
    imageTitle: string;
    imageBlog: string;
    ingredients: Array<string>;
    preparation: Array<string>;
    weight: string;
    price: number;
    count?: number;
}
