import { ICategory } from './category.model';

export interface IRating{
    name: string,
    ratingScore?: string,
    feedback?: string
}

export interface IReview{
    name: string,
    reviewMessage?: string,
    imgURL?: string
}

export interface IProduct{
    id: number,
    name: string,
    category:ICategory,
    description:string[],
    excerpts:string,
    price:number,
    promoPrice?:string,
    imageURL?:string,
    createdOn:string,
    lastUpdate?:string,
    availibility:string,
    rating?:IRating[],
    review?:IReview[],
    tag?:string[],
    isPopular?:boolean,
    ratingAverage?:number
}