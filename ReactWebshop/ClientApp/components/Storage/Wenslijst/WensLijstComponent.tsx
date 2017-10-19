import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {product, category}  from '../../DatabaseSimulation/TableTypes';

//Wenslijst component

interface WenslijstProps{
    WenslijstProduct: product;
    RemoveItemFromStorage(productToRemove:product, category:category);
}

export class WensLijstComponent extends React.Component<WenslijstProps, {}> {
    constructor(props: any){
        super(props);
        this.RemoveItemFromStorage = this.RemoveItemFromStorage.bind(this);   
    }
    RemoveItemFromStorage(){
        this.props.RemoveItemFromStorage(this.props.WenslijstProduct, this.props.WenslijstProduct.category)
    }
    render(){
        return <div className={"WensLijstComponent"}>                  
                    <div>
                    <h1>{this.props.WenslijstProduct.name}</h1>
                    <li>  <img src={this.props.WenslijstProduct.image}  height={300}/> </li>
                    <div> <h2> Naam: {this.props.WenslijstProduct.name} </h2> </div>
                    <div> <h2> Prijs: {"€" + this.props.WenslijstProduct.price.toFixed(2)} </h2> </div>
                    <h2> <button onClick={this.RemoveItemFromStorage}> Remove from WishList </button> </h2>        
                    </div> 
                    </div>                
    }
}
export default WensLijstComponent;