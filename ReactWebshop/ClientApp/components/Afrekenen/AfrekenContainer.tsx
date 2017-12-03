import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../Storage/ReusableComponents/Storage";
import {User} from "../User/User";

//Container voor afrekenmenu

export class Afrekenen extends AbstractStorage {
    constructor(){
        super();    
        //Gets the pk of the logged in user
        var loggedInUserPK = User.IsUserLoggedIn? User.GetPK() : 0;
        this.state = {products: null,customerID: loggedInUserPK, isShoppingCart:true, loaded:false, totalPrice: 0};
        this.EmptyShoppingCart = this.EmptyShoppingCart.bind(this);
        this.GetCartData = this.GetCartData.bind(this);
        this.PostOrderToDatabase = this.PostOrderToDatabase.bind(this);
        this.FinalizeOrder = this.FinalizeOrder.bind(this);
    }
    async PostOrderToDatabase(klantId, productId){
        let apiUrl = 'api/Bestelling/Post'
        let apiResponse = await fetch(apiUrl, {method: 'POST', body: JSON.stringify({klant: klantId,product: productId}) , headers: new Headers({'content-type' : 'application/json'})});
    }
    GetCartData(){
        var shoppingCartData = [];
        shoppingCartData = JSON.parse(localStorage.getItem("Winkelmand"));
        return shoppingCartData;
    }
    EmptyShoppingCart(){
        localStorage.removeItem("Winkelmand");
   
    }
    CalcPrice(){
        var totalPrice = 0;
        var Orderlist = [];
        Orderlist = this.GetCartData();
        Orderlist.forEach(order => {
            totalPrice += order.price;
            
        });
        return totalPrice;
    }
    FinalizeOrder(){
        var CartItems = this.GetCartData();
        CartItems.forEach(item => {
            if (User.IsUserLoggedIn()){
                this.PostOrderToDatabase(User.GetPK,item.productId)
            }
        });
        this.EmptyShoppingCart();
        alert("Bestelling geplaatst");
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
                <p> Total Price: €{this.CalcPrice}</p>
                <p> <button onClick={this.EmptyShoppingCart}> Bestellen </button> </p>
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
                <p> Total Price: €{this.CalcPrice}</p>
                <p> <button onClick={this.EmptyShoppingCart}> Bestellen </button> </p>
                </div>
            )
        }
        }
    }
    
        
export default Afrekenen;
