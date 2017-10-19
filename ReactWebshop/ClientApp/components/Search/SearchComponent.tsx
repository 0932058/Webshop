import * as React from 'react';
import {gameTableData, consoleTableData, accessoiresTableData} from "../DatabaseSimulation/FakeDatabase";
import {product} from "../DatabaseSimulation/TableTypes";
import {List} from "linqts";

interface SearchComponentProps{
    foundSearchResultProduct: product; //The item that was found 
    GotoProductPage(event:any, clickedOnProduct: product): void; //When the product page button is clicked it activates this method
}
export class SearchComponent extends React.Component<SearchComponentProps, {}> {
    constructor(props: any){
        super(props);   
    }
    render(){
        return <div className={"Search"}>                  
                    <div>                 
                    <h1>{this.props.foundSearchResultProduct.name}</h1>
                    <li>  <img src={this.props.foundSearchResultProduct.image}  height={300}/> </li>
                    <div> <h2> Naam: {this.props.foundSearchResultProduct.name} </h2> </div>
                    <div> <h2> Prijs: {"€" + this.props.foundSearchResultProduct.price.toFixed(2)} </h2> </div>
                    <h2> <button onClick={(e:any) => this.props.GotoProductPage(e,this.props.foundSearchResultProduct)}> Product page  </button> </h2>        
                    </div> 
                    </div>                
    }
}
export default SearchComponent;

