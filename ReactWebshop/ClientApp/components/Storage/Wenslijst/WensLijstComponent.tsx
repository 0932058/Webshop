import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {product, category}  from '../../DatabaseSimulation/TableTypes';

interface WenslijstProps{
    wishlistProduct: product;
    RemoveItemFromStorage(fk:number, category:category);
}

interface WensLIjstState{   
}

export class WensLijstComponent extends React.Component<WenslijstProps, WensLIjstState> {
    constructor(props: any){
        super(props);
        this.RemoveItemFromStorage = this.RemoveItemFromStorage.bind(this);
       
    }
    RemoveItemFromStorage(){
        this.props.RemoveItemFromStorage(this.props.wishlistProduct.pk, this.props.wishlistProduct.category)
    }
    render(){
        return <div className={"Winkelmand"}>                  
                    <div>
                    <h1>Winkelmand</h1>
                    <li>  <img src={this.props.wishlistProduct.image}  height={300}/> </li>
                    <div> <h2> Naam: {this.props.wishlistProduct.name} </h2> </div>
                    <div> <h2> Prijs: {"€" + this.props.wishlistProduct.price.toFixed(2)} </h2> </div>
                    <h2> <button onClick={this.RemoveItemFromStorage}> Remove from shopping cart </button> </h2>
                
                    </div> 
                    </div>                
    }
}
export default WensLijstComponent;