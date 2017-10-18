import {account} from "./tableTypes";
import {order1} from "./OrdersTable";

//Accounts entities

/*
pk = primary key
WishlistFK = Foreign key to wishlist
ShoppingcartFK = foreign key to shopping cart
ORderFK = foreign key to the order (product) */

export let user1: account = {
    pk:1,
    firstName: "Jan",
    lastName: "Pieter",
    email: "pietje.piet@live.nl",
    username: "pieterman",
    password: "test123",
    wishListFK: 1,
    shoppingCartFK: 1,
    orderFK: order1.pk
}