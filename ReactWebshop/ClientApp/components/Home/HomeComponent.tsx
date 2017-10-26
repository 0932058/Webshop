import * as React from 'react';
import {gameTableData, consoleTableData, accessoiresTableData} from "../DatabaseSimulation/FakeDatabase";
import {product} from "../DatabaseSimulation/TableTypes";
import {List} from "linqts";


interface HomeComponentProps{
    homeProduct: product; //The item to display on the home page 
    GotoProductPage(event:any, clickedOnProduct: product): void; //When the product page button is clicked it activates this method
}
export class HomeComponent extends React.Component<HomeComponentProps, {}> {
    constructor(props: any){
        super(props);   
    }
    render(){
        return <div className="Component">
                    <img src={this.props.homeProduct.image}/>
                    <div className="ComponentInfo">
                    <h2> {this.props.homeProduct.name} </h2>
                    <p> Prijs: {"€" + this.props.homeProduct.price.toFixed(2)} </p>
                    <p> Categorie: {this.props.homeProduct.category} </p>
                    <h2> <button onClick={(e:any) => this.props.GotoProductPage(e,this.props.homeProduct)}> Productpagina  </button> </h2>
                    </div>
                    </div>               
    }
}
export default HomeComponent;

