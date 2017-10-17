import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {game, wishList,shoppingCart, console, product, category, storage, storageCategory} from "../../DatabaseSimulation/TableTypes";
import {gameTableData, wishListData, shoppingCartdata, consoleTableData} from "../../DatabaseSimulation/FakeDatabase";
import {consoleType} from "../../DatabaseSimulation/ConsoleTable";
import {GamesComponent} from "./GamesComponent";
import {List} from "linqts";
import {AbstractGameCategory} from "./ReusableComponent/ReusableComponent";
import {ProductPage} from "../../ProductPage/ProductPageContainer";

//The Game container

export class GamesContainer extends AbstractGameCategory{
    constructor(){
        super(); 
        this.state = {foundGamesToShow: new List<game>(), categoryTitle: "", loaded:false, productPageClicked: false, clickedOnGame: null}
        this.ToProductPage = this.ToProductPage.bind(this);
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

