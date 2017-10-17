import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {game, wishList,shoppingCart, console, product, category, storage, storageCategory} from "../../DatabaseSimulation/TableTypes";
import {gameTableData, wishListData, shoppingCartdata, consoleTableData} from "../../DatabaseSimulation/FakeDatabase";
import {consoleType} from "../../DatabaseSimulation/ConsoleTable";
import {GamesComponent} from "./GamesComponent";
import {List} from "linqts";
import {ProductPage} from "../../ProductPage/ProductPageContainer";

import {genreCategory} from "../../DatabaseSimulation/GameTable";
import {subCategory} from "../../DatabaseSimulation/TableTypes";
import {Visitor,  QueryVisitor, ICategory} from "../MainReusableComponent/ReusableComponent";

//The Game container
export interface GameGenreState{
    foundGamesToShow: List<game>; //The games get loaded based on the selected category
    categoryTitle: string; // The selected category title
    productPageClicked: boolean; //To decide whever the product page must be loaded
    loaded: boolean
    clickedOnGame: game; //The productpage component gets called with the clickedonGame as props
}

export class GamesContainer  extends React.Component<RouteComponentProps<{}>, GameGenreState> implements ICategory {
    constructor(){
        super(); 
        this.state = {foundGamesToShow: new List<game>(), categoryTitle: "", loaded:false, productPageClicked: false, clickedOnGame: null}
        this.ToProductPage = this.ToProductPage.bind(this);
        this.PrepareForGameQuery = this.PrepareForGameQuery.bind(this);
        this.ToLowerCase = this.ToLowerCase.bind(this);   
    }
    //Gets the selected category
    componentWillMount(){
        var currentPath: string = this.props.location.pathname;
        var convertedPath = currentPath.replace("/Games/", "")
        var convertedPathLowercased = this.ToLowerCase(convertedPath);
        let convertedPathToEnum: genreCategory = genreCategory[convertedPathLowercased]  
        this.PrepareForGameQuery(convertedPathToEnum).then(gamesListToShow => this.setState({foundGamesToShow: gamesListToShow, categoryTitle:convertedPathLowercased, loaded: true}));  
    }
    //The url's first letter are  with uppercase (Sport for example) but they get converted to lowercase to match the enum' name(genrecategory)
    ToLowerCase(categoryToCapatalize: string){
        return categoryToCapatalize[0].toLowerCase() + categoryToCapatalize.slice(1).toLowerCase();
    }
    //Gets the games based on the category
    PrepareForGameQuery(clickedOnSubCategory: any): Promise<List<any>> {
        var visitor = new QueryVisitor();
        return visitor.MakeQueryForGames(clickedOnSubCategory);
       
    }
    
















    //When the productpage button is clicked
    ToProductPage(event: any, game: game){
        this.setState({productPageClicked: true, clickedOnGame: game})
    }
    render() {   
        return <div className={"Games"}>
            {this.state.productPageClicked? 
            <ProductPage clickedOnGame={this.state.clickedOnGame} /> :
            this.state.loaded? 
            <div>
            <h1> {this.state.categoryTitle} </h1>
            <h1> Items found: {this.state.foundGamesToShow.Count()} </h1> 
            {this.state.foundGamesToShow.ToArray().map((game, index) =>
            <GamesComponent key={index} gameToShow={game} ToProductPage ={this.ToProductPage}/>)}
            </div>
            :
            <div> loading... </div>                   
        }   
        </div>         
    }       
}
               
export default GamesContainer;

