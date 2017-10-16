import {category, wishList} from './TableTypes'
import {consoleType} from "./ConsoleTable";
import {game} from "./TableTypes";

export let wishListItem1: wishList = {
    pk: 1,
    accountFK: 1,
    productForeignKeyReference: category.consoles,
    productFK: 1
}
export let wishListItem2: wishList = {
    pk: 2,
    accountFK: 1,
    productForeignKeyReference: category.consoles,
    productFK: 1
}
export let wishListItem3: wishList = {
    pk: 3,
    accountFK: 5,
    productForeignKeyReference: category.games,
    productFK: 5
}