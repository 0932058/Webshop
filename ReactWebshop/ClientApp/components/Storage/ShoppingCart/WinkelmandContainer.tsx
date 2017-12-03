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
        this.state = {customerID: null, isShoppingCart:true, loaded:false, totalPrice: this.GetTotalPrice(), products: this.GetCartContent()}
    }
    GetCartContent(){
        var cart = [];
        cart = JSON.parse(localStorage.getItem("Winkelmand"));
        if (cart != null){return cart;}
        else{
            return [];
        }
        
    }
    GetTotalPrice(){
        var cart = this.GetCartContent();
        if (cart != []){
            var res = 0;
            cart.forEach(product =>{
                res += product.price;
            }
            )
            return res;
        }
        else{
            return 0;
        }
    }

    AddTestItemToStorage(){
        var itemlist = this.state.products;
        if (itemlist != null){
            var item = {"name" : "Vidja", "id" : 1, "price": 60, "index" : itemlist.length};
            itemlist.push(item)
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
            this.setState({totalPrice: this.GetTotalPrice(), products: this.GetCartContent()});
        }
        else{
            var item = {"name" : "Vidja", "id" : 1, "price": 60, "index" : 0};
            itemlist = [item]
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
            this.setState({totalPrice: this.GetTotalPrice(), products: this.GetCartContent()});
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