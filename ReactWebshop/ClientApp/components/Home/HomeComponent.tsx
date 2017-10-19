import * as React from 'react';
import {gameTableData, consoleTableData, accessoiresTableData} from "../DatabaseSimulation/FakeDatabase";
import {product} from "../DatabaseSimulation/TableTypes";
import {List} from "linqts";

//The Home component 

interface HomeComponentProps{
    homeProduct: product; //The item to display on the home page 
    GotoProductPage(event:any, clickedOnProduct: product): void; //When the product page button is clicked it activates this method
}
export class HomeComponent extends React.Component<HomeComponentProps, {}> {
    constructor(props: any){
        super(props);   
    }
    render(){
        return <div className={"HomeComponent"}>                  
                    <div>                 
                    
                    <h1>{this.props.homeProduct.name}</h1>
                    <li>  <img src={this.props.homeProduct.image}  height={300}/> </li>
                    <div> <h2> Naam: {this.props.homeProduct.name} </h2> </div>
                    <div> <h2> Prijs: {"€" + this.props.homeProduct.price.toFixed(2)} </h2> </div>
                    <div> <h2> Categorie: {this.props.homeProduct.category} </h2> </div>
                    <h2> <button onClick={(e:any) => this.props.GotoProductPage(e,this.props.homeProduct)}> Product page  </button> </h2>        
                    </div> 
                    </div>                
    }
}
export default HomeComponent;

