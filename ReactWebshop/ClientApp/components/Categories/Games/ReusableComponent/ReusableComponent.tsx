import {storage,category, product, game} from "../../../DatabaseSimulation/TableTypes";
import {genreCategory} from "../../../DatabaseSimulation/GameTable";
import {consoleTableData, gameTableData} from "../../../DatabaseSimulation/FakeDatabase";
import { RouteComponentProps } from 'react-router';
import * as React from 'react';
import {List} from "linqts";

//AbstractGameCategory for the game category

export interface GameGenreState{
    foundGamesToShow: List<game>; //The games get loaded based on the selected category
    categoryTitle: string; // The selected category title
    productPageClicked: boolean; //To decide whever the product page must be loaded
    loaded: boolean
    clickedOnGame: game; //The productpage component gets called with the clickedonGame as props
}
 export abstract class AbstractGameCategory  extends React.Component<RouteComponentProps<{}>, GameGenreState> {
    constructor(){
        super();
        this.GetGames = this.GetGames.bind(this);
        this.ToLowerCase = this.ToLowerCase.bind(this);   
    }
    //Gets the selected category
    componentWillMount(){
        var currentPath: string = this.props.location.pathname;
        var convertedPath = currentPath.replace("/Games/", "")
        var convertedPathLowercased = this.ToLowerCase(convertedPath);
        let convertedPathToEnum: genreCategory = genreCategory[convertedPathLowercased]  
        this.GetGames(convertedPathToEnum).then(gamesListToShow => this.setState({foundGamesToShow: gamesListToShow, categoryTitle:convertedPathLowercased, loaded: true}));  
    }
    //The url's first letter are  with uppercase (Sport for example) but they get converted to lowercase to match the enum' name(genrecategory)
    ToLowerCase(categoryToCapatalize: string){
        return categoryToCapatalize[0].toLowerCase() + categoryToCapatalize.slice(1).toLowerCase();

    }
    //Gets the games based on the category
    GetGames(clickedOnGenreCategory: genreCategory) : Promise<List<game>>{
        var gamesListToShow = gameTableData.Where(game => game.genreCategory == clickedOnGenreCategory);
        return Promise.resolve(gamesListToShow);
    }
}
export default AbstractGameCategory;