import * as React from 'react';
import {gameTableData, consoleTableData, accessoiresTableData} from "../DatabaseSimulation/FakeDatabase";
import {product} from "../DatabaseSimulation/TableTypes";
import {List} from "linqts";
import {HomeComponent} from "./HomeComponent";
import {ProductPage} from "../ProductPage/ProductPageContainer";
import { RouteComponentProps } from 'react-router';
import * as moment from "moment"; //For the date

//Home container

interface HomeContainerState{
    loaded:boolean;
    productPageButtonClicked: boolean; //When a product is clicked, the product page component is called
    foundProducts: List<product> //The products get put in the list by date
    clickedOnProduct: product; //The clicked on product gets send to the product page component 
}
export class HomeContainer extends React.Component<RouteComponentProps<{}>, HomeContainerState> {
    constructor(){
        super();
        this.state = {loaded: false, foundProducts: new List<product>(), productPageButtonClicked: false, clickedOnProduct: null}
        this.GotoProductPage = this.GotoProductPage.bind(this);
        this.GetDatabaseProducts = this.GetDatabaseProducts.bind(this);
    }
    componentWillMount(){
        this.GetDatabaseProducts().then(foundProducts => this.setState({loaded: true, foundProducts: foundProducts }));
    }
    //Gets the latest items. In the queries the date of the product is compared to the current date
    GetDatabaseProducts() : Promise<List<product>>{
        var gameSearchResult = gameTableData.Where(game => game.dateAddedToDatabase.getFullYear() == new Date().getFullYear() &&
        game.dateAddedToDatabase.getMonth() == new Date().getMonth() + 1);

        var consoleSearchResult = consoleTableData.Where(console => console.dateAddedToDatabase.getFullYear() == new Date().getFullYear() &&
        console.dateAddedToDatabase.getMonth() == new Date().getMonth() + 1);

        var accessoiresSearchResult = accessoiresTableData.Where( accessoires =>  accessoires.dateAddedToDatabase.getFullYear() == new Date().getFullYear() &&
        accessoires.dateAddedToDatabase.getMonth() == new Date().getMonth() + 1);
        
        var combinedResults: List<product> = gameSearchResult.Cast<product>().Concat(accessoiresSearchResult.Cast<product>().Concat
        (consoleSearchResult.Cast<product>()));
        var sortedCombinedResult = combinedResults.OrderBy(product => product.dateAddedToDatabase);
        return Promise.resolve(sortedCombinedResult);

    }
    //When the user clicks on the product page button, this method gets called
    GotoProductPage(event:any, clickedOnProduct: product): void{
        this.setState({productPageButtonClicked: true, clickedOnProduct: clickedOnProduct})
    }
    render(){
   
        return(
            <div className={"Home"}>
            <div> <h1> Nieuwste producten van {moment(new Date()).format("MMMM")}! </h1> </div> 
            {this.state.productPageButtonClicked?
            <ProductPage clickedOnProduct={this.state.clickedOnProduct}/>
            :
            this.state.loaded? 
            this.state.foundProducts.ToArray().map((product,index) =>
            <HomeComponent key={index} homeProduct={product} GotoProductPage={this.GotoProductPage}/>)
            :
            <div> Loading... </div>
            }
            </div>
        )}
}
export default HomeContainer;