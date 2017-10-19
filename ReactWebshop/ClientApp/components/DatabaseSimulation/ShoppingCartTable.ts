import {category, shoppingCart} from './TableTypes'
import {consoleType} from "./ConsoleTable";
import {game} from "./TableTypes";

//The shopping cart table

export let shoppingCartItem1: shoppingCart = {
    pk: 1,
    accountFK: 1,
    productForeignKeyReference: category.consoles,
    productFK: 1
}
export let shoppingCartItem2: shoppingCart = {
    pk: 2,
    accountFK: 1,
    productForeignKeyReference: category.games,
    productFK: 1
}
export let shoppingCartItem3: shoppingCart = {
    pk: 3,
    accountFK: 1,
    productForeignKeyReference: category.games,
    productFK: 2
}
export let shoppingCartItem4: shoppingCart = {
    pk: 4,
    accountFK: 2,
    productForeignKeyReference: category.games,
    productFK: 3
}
export let shoppingCartItem5: shoppingCart = {
    pk: 5,
    accountFK: 2,
    productForeignKeyReference: category.games,
    productFK: 4
}
export let shoppingCartItem6: shoppingCart = {
    pk: 6,
    accountFK: 10,
    productForeignKeyReference: category.games,
    productFK: 5
}