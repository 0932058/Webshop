import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {shoppingCartdata} from "../DatabaseSimulation/FakeDatabase";
import {game,storage, product}  from '../DatabaseSimulation/TableTypes';
import {shoppingCart}  from '../DatabaseSimulation/TableTypes';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../Storage/ReusableComponents/Storage";
import {WinkelMandComponent} from "../Storage/ShoppingCart/WinkelmandComponent";
import {User} from "../User/User";

//Container voor afrekenmenu

export class Afrekenen extends AbstractStorage {
    constructor(){
        super();    
        //Gets the pk of the logged in user
        var loggedInUserPK = User.IsUserLoggedIn? User.GetPK() : 0
        this.state = {storageProducts: new List<storage>(), convertedStorageProducts: new List<product>(),customerID: loggedInUserPK, isShoppingCart:true, loaded:false, totalPrice: 0}
    }
    render() {
        if (User.IsUserLoggedIn){
            return (
                
                <div className={"AfrekenContainer"}>
                <h1>Afrekenen</h1>
                <p> Total Price: €{this.state.totalPrice.toFixed(2)}</p>
                <p> <button> Finalize order </button> </p>
                </div>          
            )
        }
        else{
            return (
                
                <div className={"AfrekenContainer"}>
                <h1>Afrekenen</h1>
                <div>
                    <h2>Adres</h2>
                    <form>
                        <p>Naam</p>
                        <input type="text" name="Klantnaam"></input>
                        <p>Straat en Huisnummer</p>
                        <input type="text" name="KlantStraat"></input>
                        <p>Postcode</p>
                        <input type="text" name="KlantPostcode"></input>
                        <p>Stad</p>
                        <input type="text" name="KlantStad"></input>
                    </form>
                </div>
                <p> Total Price: €{this.state.totalPrice.toFixed(2)}</p>
                <p> <button> Finalize order </button> </p>
                </div>            
            )
        }}
}