import {consoleType} from "./ConsoleTable";
import {accessoiresType} from "./AccessoiresTable";
import {genreCategory, age} from "./GameTable";

//The types used for the entities

/*
The distinguishment between the products goes as follows:

enum category =  used to distinguish between the type of product (Games, accessoires and consoles) scroll,
to the type: product, to see it in action, it is used for the CategoryKind attribute.

enum storageCategory = used to distinguish between the type of storage (shopping cart and wishlist) scroll,
to the type: storage, to see it in action, it is used for the CategoryKind attribute.

enum product = Polymorphic type for the products 

enum storage = Polymorphic type for the storage (shopping cart, wishlist)

*/

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
    dateAddedToDatabase: Date;
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
    dateAddedToDatabase: Date;
 
   
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
    dateAddedToDatabase: Date;
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
