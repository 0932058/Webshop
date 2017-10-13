import {console,game,account} from "./TableTypes";
import * as gameTable from "./GameTable";
import * as accountsTable from "./AccountsTable";
import * as consoleTable from "./ConsoleTable";

//The seperate database entities have been put in an array to simulate a database

let gameTableData: game[] = [gameTable.game1,gameTable.game2,gameTable.game3,gameTable.game4,gameTable.game5,gameTable.game6,gameTable.game7,
    gameTable.game8,gameTable.game9,gameTable.game10]

let accountsTableData: account[] = [accountsTable.user1]

let consoleTableData: console[] = [consoleTable.console1, consoleTable.console2, consoleTable.console3, consoleTable.console4]