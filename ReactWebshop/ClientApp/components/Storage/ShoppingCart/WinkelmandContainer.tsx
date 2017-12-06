import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../ReusableComponents/Storage";
import {User} from "../../User/User";

//Container for the winkelmand

export class Winkelmand extends AbstractStorage {
    constructor(){
        super();
        this.state = {customerID: null, isShoppingCart:true, loaded:false, totalPrice: this.GetTotalPrice(), products: this.BuildItemStack(), ordered: false, }
    }
    BuildItemStack(){
        var cart = this.GetCartContent();
        var stacklist = [];
        cart.forEach(cartproduct => {
            var checkproduct = stacklist.find(stack => stack.product.id == cartproduct.id);
            if (checkproduct == null){
                var stack = {"product" : cartproduct, "amount" : 1};
                stacklist.push(stack);
            }
            else{
                stacklist.map(stack =>{
                    if (stack.product.id == cartproduct.id){
                        stack.amount += 1;
                    }
                });
            }
        })
        return stacklist;
    }
    AddItemToStorage(product){
        var itemlist = this.GetCartContent();
        var newproduct = product;
        newproduct.index = itemlist.length;
        itemlist.push(newproduct);
        localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
        this.setState({totalPrice: this.GetTotalPrice(), products: this.BuildItemStack()});
    }
    RemoveItemFromStorage(id){
        var oldlist = [];
        var newlist = [];
        oldlist = this.state.products;
        oldlist.forEach(stack =>{
            if (stack.product.id == id){
                if (stack.amount > 1){
                    stack.amount -= 1;
                    newlist.push(stack);
                }
            }
            else{
                newlist.push(stack);
            }
        })
        var oldcart = [];
        var newcart = [];
        oldcart = this.GetCartContent();
        var producttoremove = oldcart.find(product => product.id == id);
        oldcart.forEach(product => {
            if (product.index != producttoremove.index){
                newcart.push(product);
            }
        })
        var counter = 0
        newcart.map(
            product =>{
                product.index = counter;
                counter += 1;
            }
        )
        localStorage.setItem("Winkelmand", JSON.stringify(newcart));
        this.setState({totalPrice: this.GetTotalPrice(), products: newlist});
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

    render() {
        return (
            
        <div className={"Container"}>
                <h1>Winkelmand</h1>
                <div>
                {this.state.products.map(
                    stack =>{
                        return(
                            <div className={"Component"}>
                                <h1>{stack.product.name}</h1>
                                <img src={stack.product.image}/>
                                <div> 
                                    <h2> Naam: {stack.product.name} </h2>
                                    <h2> Console: {stack.product.console}</h2>
                                    <h2> Aantal: {stack.amount}</h2>
                                    <h2> Prijs: {"€" + (stack.product.price*stack.amount).toFixed(2)} </h2>
                                    <h2> <button onClick={() => this.AddItemToStorage(stack.product)}> + </button> </h2> 
                                    <h2> <button onClick={() => this.RemoveItemFromStorage(stack.product.id)}> - </button> </h2>        
                                </div>
                            </div>
                        )
                    }

                )
                }
                </div>
                <h2> Totaal aantal producten: {this.GetCartContent().length}</h2>
                <h2> Totaal prijs: €{this.state.totalPrice.toFixed(2)}</h2>
                <NavLink to={ '/afrekenen' } className="ContainerLink">
                   Afrekenen
                </NavLink>
        </div>
        )}
}