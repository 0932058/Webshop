/*import * as React from 'react';
import { RouteComponentProps } from 'react-router';


interface WinkelmandProps{
    shoppingCartProduct: any;
    RemoveItemFromStorage(productToRemove:any, category:any);
}

export class WinkelMandComponent extends React.Component<WinkelmandProps, {}> {
    constructor(props: any){
        super(props);
        this.RemoveItemFromStorage = this.RemoveItemFromStorage.bind(this);   
    }
    RemoveItemFromStorage(){
        var oldlist = [];
        var newlist = [];
        oldlist = JSON.parse(localStorage.getItem("Winkelmand"));
        oldlist.forEach(product =>{
            if (product.index != this.props.shoppingCartProduct.index){
                newlist.push(product);
            }
        });
        localStorage.setItem("Winkelmand" , JSON.stringify(newlist));

    }
    render(){
        return <div className={"Component"}>                  
                    <div>
                    <h1>{this.props.shoppingCartProduct.name}</h1>
                    <li>  <img src={this.props.shoppingCartProduct.image}/> </li>
                    <div> 
                    <h2> Naam: {this.props.shoppingCartProduct.name} </h2>
                    <h2> Prijs: {"€" + this.props.shoppingCartProduct.price.toFixed(2)} </h2>
                    <h2> <button onClick={this.RemoveItemFromStorage}> Verwijderen </button> </h2>        
                    </div>
                    </div>
                    </div>                
    }
}
export default WinkelMandComponent;*/