import {List} from "linqts";
import {gameTableData, consoleTableData, accessoiresTableData} from "../../DatabaseSimulation/FakeDatabase";

//Reusable component for all the categories (Accessoires, Consoles and Games)

//The visitor design pattern for the query's. 
export interface Visitor{
    MakeQueryForConsoles(clickedOnSubCategory: any) : Promise<List<any>>
    MakeQueryForGames(clickedOnSubCategory: any) : Promise<List<any>>
    MakeQueryForAccessoires(clickedOnSubCategory: any) : Promise<List<any>>
}
//The class (visitor) that is responsible for creating the category queries
//Queries get done based on the clicked on category (for example, if category xbox 360 is clicked, then xbox 360 query is getting made)
export class QueryVisitor implements Visitor{
    MakeQueryForAccessoires(clickedOnSubCategory: any): Promise<List<any>> {
        var accessoiresToShow = accessoiresTableData.Where(accessoires => accessoires.subCategory == clickedOnSubCategory);
        return Promise.resolve(accessoiresToShow);
    }
    MakeQueryForConsoles(clickedOnSubCategory: any): Promise<List<any>> {
        var consolesListToShow = consoleTableData.Where(console1 => console1.console == clickedOnSubCategory);
        return Promise.resolve(consolesListToShow);
    }
    MakeQueryForGames(clickedOnSubCategory: any): Promise<List<any>> {
        var gamesListToShow = gameTableData.Where(game => game.genreCategory == clickedOnSubCategory);
        return Promise.resolve(gamesListToShow);
    }
}
//Generic state for the categories to use
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
    PrepareForProductQuery(clickedOnSubCategory: any): Promise<List<any>>
}
