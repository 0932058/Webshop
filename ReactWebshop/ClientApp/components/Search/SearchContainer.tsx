import * as React from 'react';
import {gameTableData, consoleTableData, accessoiresTableData} from "../DatabaseSimulation/FakeDatabase";
import {product} from "../DatabaseSimulation/TableTypes";
import {List} from "linqts";
import {SearchComponent} from "./SearchComponent";
import {ProductPage} from "../ProductPage/ProductPageContainer";
import { RouteComponentProps } from 'react-router';

//Search container

interface SearchContainerState{
    loaded:boolean;
    productPageButtonClicked: boolean; //When a product page is clicked, the product page component is called
    foundProducts: List<product> //The products that match the search text gets put into this list
    clickedOnProduct: product; //The clicked on product gets send to the product page component 
    searchBarText: string; //The typed in search bar text
}

export class SearchContainer extends React.Component<RouteComponentProps<{}>, SearchContainerState> {
    constructor(){
        super();
        this.state = {loaded: false, foundProducts: new List<product>(), productPageButtonClicked: false, clickedOnProduct: null, searchBarText:""}
        this.SearchInDatabaseForSearchTerms = this.SearchInDatabaseForSearchTerms.bind(this);
        this.GotoProductPage = this.GotoProductPage.bind(this);
        this.SetSearchItem = this.SetSearchItem.bind(this);
    }

    componentWillMount(){
        var res = localStorage.getItem("searchBox");
        this.SetSearchItem().then(searchBarText => this.setState({searchBarText: searchBarText})).then(yo =>
        this.SearchInDatabaseForSearchTerms().then(foundProducts => this.setState({loaded: true, foundProducts: foundProducts })));
     
    }
    //Gets the search item
    SetSearchItem() : Promise<string>{
        var searchBarText = localStorage.getItem("searchBox");
        return Promise.resolve(searchBarText);

    }
    //Search in the database for items that match the search text
    SearchInDatabaseForSearchTerms() : Promise<List<product>>{
        var gameSearchResult = gameTableData.Where(game => game.name.toLowerCase().includes(this.state.searchBarText.toLowerCase()));
        var consoleSearchResult = consoleTableData.Where(console => console.name.toLowerCase().includes(this.state.searchBarText.toLowerCase()));
        var accessoiresSearchResult = accessoiresTableData.Where(accessoires => accessoires.name.toLowerCase().includes(this.state.searchBarText.toLowerCase()));  
        var combinedResults: List<product> = gameSearchResult.Cast<product>().Concat(accessoiresSearchResult.Cast<product>().Concat
        (consoleSearchResult.Cast<product>()));
        return Promise.resolve(combinedResults);
    }
    //When the user clicks on the product page button, this method gets called
    GotoProductPage(event:any, clickedOnProduct: product): void{
        this.setState({productPageButtonClicked: true, clickedOnProduct: clickedOnProduct})
    }
    render(){
        return(
            <div className={"Searches"}>
            {this.state.productPageButtonClicked?
            <ProductPage clickedOnProduct={this.state.clickedOnProduct}/>
            :
            this.state.loaded? 
            this.state.foundProducts.ToArray().map((product,index) =>
            <SearchComponent key={index} foundSearchResultProduct={product} GotoProductPage={this.GotoProductPage}/>)
            :
            <div> Loading... </div>
            }
            </div>
        )}
}
export default SearchContainer;