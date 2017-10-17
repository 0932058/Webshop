//Category enum
import {consoleType} from "./ConsoleTable";
import {accessoiresType} from "./AccessoiresTable";
import {genreCategory, age} from "./GameTable";

export type subCategory = consoleType | genreCategory


export enum category{
    consoles = "consoles",
    games = "games",
    accessoires = "accessoires"
}
export enum storageCategory{
    wishlist = "wishlist",
    shoppingCart = "shopping Cart"
}
export type accessoires = {
    pk: number,
    name: string,
    description: string,
    price: number,
    image: string
    subCategory: accessoiresType
    category:category

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
    category: category,
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
    productForeignKeyReference: category,
    productFK: number,
}
export type shoppingCart = {
    pk: number,
    accountFK: number,
    productForeignKeyReference: category,
    productFK: number
}
export type product = game & {categoryKind: category.games} | console & {categoryKind: category.consoles} | accessoires & {categoryKind: category.accessoires}

export type storage = wishList & {categoryKind: storageCategory.wishlist} | shoppingCart & {categoryKind: storageCategory.shoppingCart}
