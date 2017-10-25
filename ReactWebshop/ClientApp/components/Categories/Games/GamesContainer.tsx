import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {game, wishList,shoppingCart, console, product, category, storage, storageCategory} from "../../DatabaseSimulation/TableTypes";
import {gameTableData, wishListData, shoppingCartdata, consoleTableData} from "../../DatabaseSimulation/FakeDatabase";
import {consoleType} from "../../DatabaseSimulation/ConsoleTable";
import {GamesComponent} from "./GamesComponent";
import {List} from "linqts";
import {ProductPage} from "../../ProductPage/ProductPageContainer";
import {genreCategory} from "../../DatabaseSimulation/GameTable";
import {Visitor,  QueryVisitor, ICategory, ICategoryState} from "../MainReusableComponent/ReusableComponent";

export class GamesContainer  extends React.Component<RouteComponentProps<{}>, ICategoryState<game>> implements ICategory {
    constructor(){
        super(); 
        this.state = {foundProductToShow: new List<game>(), categoryTitle: "", loaded:false, productPageClicked: false, clickedOnProduct: null}
        this.ToProductPage = this.ToProductPage.bind(this);
        this.PrepareForProductQuery = this.PrepareForProductQuery.bind(this);
        this.ToLowerCase = this.ToLowerCase.bind(this);   
    }
    //Gets the selected category
    componentWillMount(){
        var currentPath: string = this.props.location.pathname;
        var convertedPath = currentPath.replace("/Games/", "")
        var convertedPathLowercased = this.ToLowerCase(convertedPath);
        let convertedPathToEnum: genreCategory = genreCategory[convertedPathLowercased]  
        this.PrepareForProductQuery(convertedPathToEnum).then(gamesListToShow => this.setState({foundProductToShow: gamesListToShow, categoryTitle:convertedPathLowercased, loaded: true}));  
    }
    //The url's first letter are  with uppercase (Sport for example) but they get converted to lowercase to match the enum' name(genrecategory)
    ToLowerCase(categoryToCapatalize: string){
        return categoryToCapatalize[0].toLowerCase() + categoryToCapatalize.slice(1).toLowerCase();
    }
    //Gets the games based on the category
    PrepareForProductQuery(clickedOnSubCategory: any): Promise<List<any>> {
        var visitor = new QueryVisitor();
        return visitor.MakeQueryForGames(clickedOnSubCategory);
       
    }
    //When the productpage button is clicked
    ToProductPage(event: any, game: game){
        this.setState({productPageClicked: true, clickedOnProduct: game})
    }
    render() {   
        return <div className={"Container"}>
            {this.state.productPageClicked? 
            <ProductPage clickedOnProduct={this.state.clickedOnProduct} /> :
            this.state.loaded? 
            <div>
            <h1> {this.state.categoryTitle} </h1>
            <h2> Aantal Producten: {this.state.foundProductToShow.Count()} </h2> 
            {this.state.foundProductToShow.ToArray().map((game, index) =>
            <GamesComponent key={index} gameToShow={game} ToProductPage ={this.ToProductPage}/>)}
            </div>
            :
            <div> laden </div>                   
        }   
        </div>         
    }       
}
               
export default GamesContainer;

