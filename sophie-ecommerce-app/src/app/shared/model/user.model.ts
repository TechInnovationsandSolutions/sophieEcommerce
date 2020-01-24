export interface IUSer{
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    phoneNumber:string,
    address?:{
        location?:string,
        city?:string,
        state?:string,
        country?:string,
    }
}