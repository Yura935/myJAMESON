export interface IWhiskey {
    id: number | string;
    name: string;
    urlName: string;
    descriptionTitle: string;
    description: string;
    imageTitle: string;
    imageBlog: string;
    aroma: string;
    taste: string;
    afterTaste: string;
    weight: string;
    price: number;
    video: string;
    count?: number;
}
