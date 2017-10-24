import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {shoppingCartdata} from "../DatabaseSimulation/FakeDatabase";
import {game,storage, product}  from '../DatabaseSimulation/TableTypes';
import {shoppingCart}  from '../DatabaseSimulation/TableTypes';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../Storage/ReusableComponents/Storage";
import {User} from "../User/User";

export class AfrekenContentLoggedOut extends AbstractStorage {
    constructor(){
        super();    
        //Gets the pk of the logged in user
        var loggedInUserPK = User.IsUserLoggedIn? User.GetPK() : 0
        this.state = {storageProducts: new List<storage>(), convertedStorageProducts: new List<product>(),customerID: loggedInUserPK, isShoppingCart:true, loaded:false, totalPrice: 0}
    }
    render() {
            return (
            
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
            )}
        }
    
        
export default AfrekenContentLoggedOut;