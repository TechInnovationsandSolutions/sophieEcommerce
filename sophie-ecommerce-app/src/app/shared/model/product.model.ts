import { ICategory } from './category.model';

export interface IReview{
    name: string,
    reviewSummary?: string,
    reviewMessage?: string,
    rating?:number,
    reviewDate?: Date
}

export interface IProduct{
    id: number,
    name: string,
    category:ICategory,
    description:string[],
    excerpts:string,
    price:number,
    promoPrice?:number,
    imageURL?:string,
    createdOn:string,
    lastUpdate?:string,
    availibility:string,
    review?:IReview[],
    tag?:string[],
    isPopular?:boolean,
    ratingAverage?:number
}