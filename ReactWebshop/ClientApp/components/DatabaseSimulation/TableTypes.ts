//Category enum
import {consoleType} from "./ConsoleTable";
import {genreCategory, age} from "./GameTable";

export enum category{
    consoles = "consoles",
    games = "games",
    accessoires = "accessoires"
}
export type account = {
    pk: number,
    firstName:string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    wishListFK: number,
    shoppingCartFK: number,
    orderFK: number[] | number | null
    
}
export type console = {
    pk: number,
    name: string,
    console: consoleType,
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
export type wishList = {
    pk: number,
    accountFK: number,
    productFK: number[],
}
export type shoppingCart = {
    pk: number,
    accountFK: number,
    productFK: number[]
}
export type product = game & {kind:"game"} | console & {kind:"console"}