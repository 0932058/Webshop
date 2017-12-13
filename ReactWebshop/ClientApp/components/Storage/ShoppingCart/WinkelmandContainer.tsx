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
        this.state = {
            customerID: null, 
            isShoppingCart:true, 
            loaded:false, 
            totalPrice: this.GetTotalPrice(), 
            products: this.BuildItemStack(), 
            ordered: false, 
            formVoornaam: "",
            formAchternaam: "",
            formStraatnaam: "",
            formPostcode: "",
            formEmail: ""
        }
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
            <div className='container'>
                <div className='col-md-9'>
                <h1>Winkelmand</h1>
                </div>
                <div className='col-md-3'>
                <h4> Aantal producten: {this.GetCartContent().length}</h4>
                <h4> Totaal prijs: €{this.state.totalPrice.toFixed(2)}</h4>
                <NavLink  to={ '/afrekenen' } className="btn btn-primary">
                   Afrekenen
                </NavLink>
                </div>
            </div>

                <div className="panel-heading"><h2>Producten</h2></div>
                <div>
                    { this.GetCartContent().length == 0?
                    <div>
                        <h4>Er staan geen artikelen in de winkelmand</h4>
                        <NavLink to={"/"}>
                            <button className="btn btn-primary">Verder winkelen</button>
                        </NavLink>
                    </div>
                    :
                    null}
                {this.state.products.map(
                    stack =>{
                        return(
                            <div className={"Component"}>
                            <div className='container'>
                                <div className="panel panel-default">    
                                    <div className='col-md-2'>
                                        <div className="panel-body"><img className="img-responsive" src={stack.product.image}/></div>
                                    </div>
                                    <div className='col-md-4'>
                                        <p>{stack.product.name}</p>
                                        <p>Naam: {stack.product.name}</p>
                                        <p>Console: {stack.product.console}</p>
                                        <p>Prijs: {"€" + (stack.product.price*stack.amount).toFixed(2)}</p>
                                        </div>
                                        <div className='col-md-4'>
                                        <p>Aantal: 
                                        <button className="btn btn-danger" onClick={() => this.RemoveItemFromStorage(stack.product.id)}> - </button>
                                        {stack.amount}
                                        <button className="btn btn-success" onClick={() => this.AddItemToStorage(stack.product)}> + </button>
                                        </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    }

                )
                }


                </div>


        </div>
        )}
}