import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {shoppingCartdata} from "../DatabaseSimulation/FakeDatabase";
import {game,storage, product}  from '../DatabaseSimulation/TableTypes';
import {shoppingCart}  from '../DatabaseSimulation/TableTypes';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../Storage/ReusableComponents/Storage";
import {AfrekenContentLoggedIn} from "../Afrekenen/AfrekenContentLoggedIn";
import {AfrekenContentLoggedOut} from "../Afrekenen/AfrekenContentLoggedOut";
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
        if (User.IsUserLoggedIn() == true) {
            return (
                <div className={"Container"}>
                <h1>Afrekenen</h1>
                <div>{AfrekenContentLoggedIn}</div>
                <p> Total Price: €{this.state.totalPrice.toFixed(2)}</p>
                <p> <button> Finalize order </button> </p>
                </div>
            )
        }
        else
            {return (
                <div className={"Container"}>
                <h1>Afrekenen</h1>
                <div>{AfrekenContentLoggedOut}</div>
                <p> Total Price: €{this.state.totalPrice.toFixed(2)}</p>
                <p> <button> Finalize order </button> </p>
                </div>
            )
        }
        }
    }
    
        
export default Afrekenen;
