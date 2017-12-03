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
        this.state = {customerID: null, isShoppingCart:true, loaded:false, totalPrice: 0, products: null}
        this.GenerateShoppingCart = this.GenerateShoppingCart.bind(this);
        this.RemoveItemFromStorage = this.RemoveItemFromStorage.bind(this);
    }
    GenerateShoppingCart(){
        var res;
        if (this.state.products != null){
        this.state.products.forEach(product => {
            res += <div className= "Component">
                <img src={product.image} />
                <h2>Product: {product.name}</h2>
                <h2>Prijs: €{product.price}</h2>
                <h2> <button onClick={() => this.RemoveItemFromStorage(product.id)}> Verwijderen </button> </h2> 
            </div>
        });
        }
        else{
            res = <div className= "Component"><h2>Uw winkelmand is leeg.</h2></div>;
        }
        return res;
    }
    RemoveItemFromStorage(id){
        var oldcart = this.state.products;
        var newcart = [];
        oldcart.forEach(product =>{
            if (product.id != id){
                newcart += product;
            }
        });
        localStorage.setItem("Winkelmand", JSON.stringify(newcart));
        this.setState({products: this.GetCartContent()});
    }
    GetCartContent(){
        var cart = [];
        cart = JSON.parse(localStorage.getItem("Winkelmand"));
        return cart;
    }
    AddTestItemToStorage(){
        var item = {"name" : "Vidja", "id" : 1, "price": 60};
        if (this.state.products != null){
            this.state.products.push(item)
            localStorage.setItem("Winkelmand", JSON.stringify(this.state.products));
        }
        else{
            localStorage.setItem("Winkelmand", JSON.stringify(item));
        }
        
    }
    GetCartLength(){
        if (this.state.products != null){
            return this.state.products.length;
        }
        else{
            return 0;
        }
    }
    GetCartPrice(){
        if (this.state.products != null){
            return this.state.totalPrice.toFixed(2);
        }
        else{
            return 0;
        }
    }
    
    render() {
        return (
            
        <div className={"Container"}>
                <h1>Winkelmand</h1>
                {this.GenerateShoppingCart} 
                <h2> Aantal producten: {() => this.GetCartLength()}</h2>
                <h2> Totaal prijs: €{() => this.GetCartPrice()}</h2>
                <h2> <NavLink to={ '/afrekenen' }>
                   Afrekenen
                </NavLink> </h2>
                <h2><button onClick={() => this.AddTestItemToStorage()}>Testitem toevoegen</button></h2>
        </div>
        )}
}