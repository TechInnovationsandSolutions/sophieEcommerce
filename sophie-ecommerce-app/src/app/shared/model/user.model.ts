export interface IUSer{
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    // address?:{
    //     location?:string,
    //     city?:string,
    //     state?:string,
    //     country?:string,
    // }
}

export interface IUserReg{
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    password: string
}