import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../ReusableComponents/Storage";
import {WinkelMandComponent} from "./WinkelmandComponent";
import {User} from "../../User/User";

//Container for the winkelmand

export class Winkelmand extends AbstractStorage {
    constructor(){
        super();
        this.state = {customerID: null, isShoppingCart:true, loaded:false, totalPrice: 0, products: this.GetCartContent()}
    }
    GetCartContent(){
        var cart = [];
        cart = JSON.parse(localStorage.getItem("Winkelmand"));
        if (cart != null){return cart;}
        else{
            return [];
        }
        
    }
    AddTestItemToStorage(){
        var item = {"name" : "Vidja", "id" : 1, "price": 60};
        var itemlist = this.state.products;
        if (itemlist != null){
            itemlist.push(item)
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
            this.setState({products: this.GetCartContent()});
        }
        else{
            itemlist = [item]
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
            this.setState({products: this.GetCartContent()});
        }
        
    }
    
    render() {
        return (
            
        <div className={"Container"}>
                <h1>Winkelmand</h1>
                <div>
                {this.state.products.map((storageProduct,index) =>
                <WinkelMandComponent key={index} shoppingCartProduct={storageProduct} RemoveItemFromStorage={null}/>)  
                }
                </div>
                <h2> Aantal producten: {this.state.products.length}</h2>
                <h2> Totaal prijs: €{this.state.totalPrice.toFixed(2)}</h2>
                <h2> <NavLink to={ '/afrekenen' }>
                   Afrekenen
                </NavLink> </h2>
                <h2><button onClick={() => this.AddTestItemToStorage()}>Testitem toevoegen</button></h2>
        </div>
        )}
}