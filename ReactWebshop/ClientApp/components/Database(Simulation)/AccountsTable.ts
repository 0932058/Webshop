import {game} from "./GameTable";
import {console} from "./ConsoleTable";

//Accounts Table

export type account = {
    firstName:string,
    lastName: string,
    email: string,
    username: string,
    password: string
    wishList: any[] | null
    shoppingCart: any[] | null
}
export let user1: account = {
    firstName: "Jan",
    lastName: "Pieter",
    email: "pietje.piet@live.nl",
    username: "pieterman",
    password: "test123",
    wishList: null,
    shoppingCart: null
}