import {List} from "linqts";
import {gameTableData, consoleTableData} from "../../DatabaseSimulation/FakeDatabase";

//Reusable component for all the categories

//The interface of the visitor
export interface Visitor{
    MakeQueryForConsoles(clickedOnSubCategory: any) : Promise<List<any>>
    MakeQueryForGames(clickedOnSubCategory: any) : Promise<List<any>>
}
//The class (visitor) that is responsible for making the category queries
//Queries get done based on the clicked on category
export class QueryVisitor implements Visitor{
    MakeQueryForConsoles(clickedOnSubCategory: any): Promise<List<any>> {
        var consolesListToShow = consoleTableData.Where(console1 => console1.console == clickedOnSubCategory);
        return Promise.resolve(consolesListToShow);
    }
    MakeQueryForGames(clickedOnSubCategory: any): Promise<List<any>> {
        var gamesListToShow = gameTableData.Where(game => game.genreCategory == clickedOnSubCategory);
        return Promise.resolve(gamesListToShow);
    }
}
//Generic state for the categories
export interface ICategoryState<T>{
    foundProductToShow: List<T>; //The list of products loaded on screen
    categoryTitle: string;  //The main category title to dispaly above the screen
    productPageClicked: boolean; //If the product page is clicked the product component is called
    loaded: boolean 
    clickedOnProduct: T; //The clicked on product will be given to the product page component 
}
//Methods the categories need to have
export interface ICategory {
    componentWillMount();
    ToLowerCase(categoryToCapatalize: string);
}
