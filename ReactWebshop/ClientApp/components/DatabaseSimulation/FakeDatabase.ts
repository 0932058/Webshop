import {console,game,user, order,wishList, shoppingCart, accessoires} from "./TableTypes";
import * as gameTable from "./GameTable";
import * as accountsTable from "./AccountsTable";
import * as consoleTable from "./ConsoleTable";
import * as orderTable from "./OrdersTable";
import * as wishListTable from "./WishlistTable";
import * as shoppingCartTable from "./ShoppingCartTable";
import * as accessoiresTable from "./AccessoiresTable";
import {List} from "linqts"; //Lists can be approached with LINQ

//The seperate database entities have been put in a lists to simulate a database
//The lists can be approached with LINQ thanks to the "linqts" library 

export let gameTableData = new List<game>([gameTable.game1,gameTable.game2,gameTable.game3,gameTable.game4,gameTable.game5,gameTable.game6,gameTable.game7,
    gameTable.game8,gameTable.game9,gameTable.game10])

export let accountsTableData  = new List<user>([])

export let consoleTableData = new List<console>([consoleTable.console1, consoleTable.console2, consoleTable.console3, consoleTable.console4])

export let orderTabledata = new List<order>([orderTable.order1,orderTable.order2,orderTable.order3,orderTable.order4,orderTable.order5])

export let wishListData = new List<wishList>([wishListTable.wishListItem1, wishListTable.wishListItem2, wishListTable.wishListItem3, wishListTable.wishListItem4, wishListTable.wishListItem5])

export let shoppingCartdata = new List<shoppingCart>([shoppingCartTable.shoppingCartItem1, shoppingCartTable.shoppingCartItem2,
shoppingCartTable.shoppingCartItem3, shoppingCartTable.shoppingCartItem4, shoppingCartTable.shoppingCartItem5, shoppingCartTable.shoppingCartItem6])

export let  accessoiresTableData = new List<accessoires>([accessoiresTable.accessoire,accessoiresTable.accessoire1,accessoiresTable.accessoire2,accessoiresTable.accessoire3,accessoiresTable.accessoire4]);