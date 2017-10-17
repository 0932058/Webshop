import {List} from "linqts";
import {gameTableData} from "../../DatabaseSimulation/FakeDatabase";

//Reusable component for all the categories
//Visitor design to make the queries.

export interface Visitor{
    MakeQueryForGames(clickedOnSubCategory: any) : Promise<List<any>>
}
export class QueryVisitor implements Visitor{
    MakeQueryForGames(clickedOnSubCategory: any): Promise<List<any>> {
        var gamesListToShow = gameTableData.Where(game => game.genreCategory == clickedOnSubCategory);
        return Promise.resolve(gamesListToShow);
    }
}
export interface ICategory {
    componentWillMount();
    ToLowerCase(categoryToCapatalize: string);
}

export default Visitor;
