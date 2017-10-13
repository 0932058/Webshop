//Category enum
import {consoleType} from "./ConsoleTable";
import {genreCategory, orderstatus, age} from "./GameTable";

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
    password: string
    wishList: any[] | null
    shoppingCart: any[] | null
}
export type console = {
    pk: number,
    name: string,
    consoleType: consoleType,
    description: string,
    memory: string,
    image: string,
    ammountAvailable: number
}
export type game = {
    pk: number,
    name:string,
    description: string,
    console: consoleType,
    price: number,
    genreCategory: genreCategory,
    category: category,
    orderdate: string | null, //order related attributes are null in the beginning, their value gets changed when an order is amde
    orderStatus: orderstatus | null,
    onProductPage: boolean | null,
    age: age,
    image: string,
    ammountAvailable: number
}