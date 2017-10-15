import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {product}  from '../../DatabaseSimulation/TableTypes';

interface WinkelmandProps{
    shoppingCartProduct: product;
    RemoveItemFromStorage(event:any);
}

interface WinkelmandState{   
}

export class WinkelMandComponent extends React.Component<WinkelmandProps, WinkelmandState> {
    constructor(){
        super();
    }
    render(){
        return <div className={"Winkelmand"}>                  
                    <div>
                    <h1>Winkelmand</h1>
                    <li>  <img src={this.props.shoppingCartProduct.image}  height={300}/> </li>
                    <div> <h2> Naam: {this.props.shoppingCartProduct.name} </h2> </div>
                    <div> <h2> Prijs: {"€" + this.props.shoppingCartProduct.price.toFixed(2)} </h2> </div>
                    <button onClick={() => {this.props.RemoveItemFromStorage} }> remove this item</button>   
                    </div> 
                    </div>                
    }
}
export default WinkelMandComponent;