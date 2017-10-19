import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {game, wishList,shoppingCart, console, product, category, storage, storageCategory} from "../../DatabaseSimulation/TableTypes";
import {gameTableData, wishListData, shoppingCartdata, consoleTableData} from "../../DatabaseSimulation/FakeDatabase";
import {consoleType} from "../../DatabaseSimulation/ConsoleTable";
import {ConsolesComponent} from "./ConsolesComponent";
import {List} from "linqts";
import {ProductPage} from "../../ProductPage/ProductPageContainer";
import {genreCategory} from "../../DatabaseSimulation/GameTable";
import {Visitor,  QueryVisitor, ICategory, ICategoryState} from "../MainReusableComponent/ReusableComponent";

//The console container

export class ConsolesContainer  extends React.Component<RouteComponentProps<{}>, ICategoryState<console>> implements ICategory{
    constructor(){
        super(); 
        this.state = {foundProductToShow: new List<console>(), categoryTitle: "", loaded:false, productPageClicked: false, clickedOnProduct: null}
        this.ToProductPage = this.ToProductPage.bind(this);
        this. PrepareForProductQuery = this. PrepareForProductQuery.bind(this);
        this.ToLowerCase = this.ToLowerCase.bind(this);   
    }
    //Gets the selected category
    componentWillMount(){
        var currentPath: string = this.props.location.pathname;
        var convertedPath = currentPath.replace("/Consoles/", "")
        var convertedPathLowercased = this.ToLowerCase(convertedPath);
        let convertedPathToEnum: consoleType = consoleType[convertedPathLowercased]  
        this. PrepareForProductQuery(convertedPathToEnum).then(consoleListToShow => this.setState({foundProductToShow: consoleListToShow, categoryTitle:convertedPathLowercased, loaded: true}));  
    }
    //The url's first letter are  with uppercase (Sport for example) but they get converted to lowercase to match the enum' name(genrecategory)
    ToLowerCase(categoryToCapatalize: string){
        var res = categoryToCapatalize[0].toLowerCase() + categoryToCapatalize.slice(1).toLowerCase();
        return res;
    }
    //Gets the consoles based on the category
    PrepareForProductQuery(clickedOnSubCategory: consoleType): Promise<List<any>> {
        var visitor = new QueryVisitor();
        return visitor.MakeQueryForConsoles(clickedOnSubCategory);
    }
    //When the productpage button is clicked
    ToProductPage(event: any, console: console){
        this.setState({productPageClicked: true, clickedOnProduct: console})
    }
    render() {   
        return <div className={"ConsoleContainer"}>
            {this.state.productPageClicked? 
            <ProductPage clickedOnProduct={this.state.clickedOnProduct} /> :
            this.state.loaded? 
            <div>
            <h1> {this.state.categoryTitle} </h1>
            <h1> Items found: {this.state.foundProductToShow.Count()} </h1> 
            {this.state.foundProductToShow.ToArray().map((console, index) =>
            <ConsolesComponent key={index} consoleToShow={console} ToProductPage ={this.ToProductPage}/>)}
            </div>
            :
            <div> loading... </div>                   
        }   
        </div>         
    }       
}
               
export default ConsolesContainer;

