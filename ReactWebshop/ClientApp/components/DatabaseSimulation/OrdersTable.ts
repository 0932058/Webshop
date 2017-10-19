import {order, category} from "./TableTypes";
import {gameTableData, accountsTableData} from "ClientApp/components/DatabaseSimulation/FakeDatabase"

//The order entities
//The productForeignKeyreference is to identify the product of the order

export let order1: order = {
    pk: 1,
    accountFK: 2, 
    productFK: 1,
    productForeignKeyReference: category.consoles,
    orderdate: "10 Oktober 2017",
    statusOfOrder: "In behandeling"
}
export let order2: order = {
    pk: 2,
    accountFK: 2, 
    productFK: 1, 
    productForeignKeyReference: category.games,
    orderdate: "5 Oktober 2017",
    statusOfOrder: "In behandling"
}
export let order3: order = {
    pk: 3,
    accountFK: 2, 
    productFK: 3, 
    productForeignKeyReference: category.consoles,
    orderdate: "2 Oktober 2017",
    statusOfOrder: "Bezorgd"
}
export let order4: order = {
    pk: 4,
    accountFK: 1, 
    productFK: 4,
    productForeignKeyReference: category.consoles,
    orderdate: "1 Oktober 2017",
    statusOfOrder: "In behandeling"
}
export let order5: order = {
    pk: 5,
    accountFK: 1, 
    productFK: 5, 
    productForeignKeyReference: category.games,
    orderdate: "5 Oktober 2017",
    statusOfOrder: "Onderweg"
}