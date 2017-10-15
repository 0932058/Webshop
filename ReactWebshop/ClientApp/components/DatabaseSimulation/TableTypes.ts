//Category enum
import {consoleType} from "./ConsoleTable";
import {genreCategory, age} from "./GameTable";

export enum category{
    consoles = "consoles",
    games = "games",
    accessoires = "accessoires"
}
export enum foreignKeyReference{}

export type account = {
    pk: number,
    firstName:string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    wishList: any[] | null,
    shoppingCart: any[] | null,
    orderFK: number[] | number | null
    
}
export type console = {
    pk: number,
    name: string,
    consoleType: consoleType,
    description: string,
    memory: string,
    image: string,
    ammountAvailable: number,
    price: number
}
export type game = {
    pk: number,
    name:string,
    description: string,
    console: consoleType,
    price: number,
    genreCategory: genreCategory,
    category: category,
    age: age,
    image: string,
    ammountAvailable: number
}

export type order =  {
    pk: number,
    accountFK: number,
    productFK: number,
    productForeignKeyReference: category,
    orderdate: string | null, 
    statusOfOrder:  null | string
}

    
