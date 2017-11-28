import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {shoppingCartdata} from "../DatabaseSimulation/FakeDatabase";
import {game,storage, product}  from '../DatabaseSimulation/TableTypes';
import {shoppingCart}  from '../DatabaseSimulation/TableTypes';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../Storage/ReusableComponents/Storage";
import {User} from "../User/User";

//Container voor afrekenmenu

export class Afrekenen extends AbstractStorage {
    constructor(){
        super();    
        //Gets the pk of the logged in user
        var loggedInUserPK = User.IsUserLoggedIn? User.GetPK() : 0
        this.state = {products: null,customerID: loggedInUserPK, isShoppingCart:true, loaded:false, totalPrice: 0}
        this.EmptyShoppingCart = this.EmptyShoppingCart.bind(this);
    }
    EmptyShoppingCart(){
        var itemsToDelete = shoppingCartdata.Where(item => item.accountFK == User.GetPK());
        console.log(itemsToDelete.Count() + " BEFORE DELETE!")
        while(itemsToDelete.Count() > 0){
            shoppingCartdata.RemoveAt(itemsToDelete.Count()-1);
            itemsToDelete = shoppingCartdata.Where(item => item.accountFK == User.GetPK());
        }
        console.log(itemsToDelete.Count() + " AFTER DELETE!")
        this.setState({totalPrice: 0})
        alert("Uw bestelling is voltooid")
   
    }

    render() {
        if (User.IsUserLoggedIn() == true) {
            return (
                <div className={"Container"}>
                <h1>Afrekenen</h1>
                <ul>
                    <li>
                        <h2>Naam</h2>
                        <p>{User.GetFirstname() + ' ' + User.GetLastname()}</p>
                    </li>
                    <li>
                        <h2>Straat</h2>
                        <p>{User.GetStreetname()}</p>
                    </li>
                    <li>
                        <h2>Postcode</h2>
                        <p>{User.getPostcode()}</p>
                    </li>
                </ul>
                <p> Total Price: €{this.state.totalPrice.toFixed(2)}</p>
                <p> <button> Finalize order </button> </p>
                </div>
            )
        }
        else
            {return (
                <div className={"Container"}>
                <h1>Afrekenen</h1>\
                <p>Adres voor bezorging en incasso.</p>
                <form>
                    <li><input placeholder="voornaam" type="text" name="firstname" /> </li>
                    <li><input placeholder="achternaam" type="text" name="lastname" /> </li>
                    <li><input placeholder='straatnaam' type="text" name="streetname" /> </li>
                    <li><input placeholder="postcode" type="text" name="postcode" /> </li> 
                </form>
                <p> Total Price: €{this.state.totalPrice.toFixed(2)}</p>
                <p> <button onClick={this.EmptyShoppingCart}> Bestellen </button> </p>
                </div>
            )
        }
        }
    }
    
        
export default Afrekenen;
