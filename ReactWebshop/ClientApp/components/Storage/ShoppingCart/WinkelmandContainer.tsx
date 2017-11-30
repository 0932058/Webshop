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
        //Gets the pk of the logged in user
        var loggedInUserPK = User.IsUserLoggedIn? User.GetPK() : 0
        this.state = {customerID: loggedInUserPK, isShoppingCart:true, loaded:false, totalPrice: 0, products: null}
    }
    render() {
        return (
            
        <div className={"Container"}>
            <h1>Winkelmand</h1>
            {this.state.products.map((product,index) =>
            <WinkelMandComponent key={index} shoppingCartProduct={product} RemoveItemFromStorage={null}/>)
            }    
        </div>
        )}
}