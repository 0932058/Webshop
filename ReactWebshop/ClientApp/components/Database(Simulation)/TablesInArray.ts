import * as gameTable from "./gameTable";
import * as accountsTable from "./accountsTable";
import * as consoleTable from "./consoleTable";

//The seperate database entities have been put in an array to simulate a database

let gameTableData: gameTable.game[] = [gameTable.game1,gameTable.game2,gameTable.game3,gameTable.game4,gameTable.game5,gameTable.game6,gameTable.game7,
    gameTable.game8,gameTable.game9,gameTable.game10]

let accountsTableData: accountsTable.account[] = [accountsTable.user1]

let consoleTableData: consoleTable.console[] = [consoleTable.console1, consoleTable.console2, consoleTable.console3, consoleTable.console4]