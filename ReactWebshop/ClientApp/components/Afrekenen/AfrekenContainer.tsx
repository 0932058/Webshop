import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../Storage/ReusableComponents/Storage";
import {User} from "../User/User";
import { Redirect } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap';

//Container voor afrekenmenu
export class Afrekenen extends AbstractStorage {
    constructor(){
        super();    
        //Gets the pk of the logged in user
        var loggedInUserPK = User.IsUserLoggedIn? User.GetPK() : 0;
        this.state = { 
            products: this.GetCartData(), 
            customerID: loggedInUserPK, 
            isShoppingCart:true, 
            loaded:false, 
            totalPrice: this.CalcPrice(),
            ordered: false,
        };

        this.EmptyShoppingCart = this.EmptyShoppingCart.bind(this);
        this.GetCartData = this.GetCartData.bind(this);
        this.PostOrderToDatabase = this.PostOrderToDatabase.bind(this);
        this.FinalizeOrder = this.FinalizeOrder.bind(this);
        this.SendBestellingenEmail = this.SendBestellingenEmail.bind(this);
    }
    async PostOrderToDatabase(klantId, id){
        let apiUrl = 'api/Bestellingen/Post'
        let orderToPost: Bestelling = {
            BestellingId: 0, 
            klantId: klantId,
            productId: id,
            bestellingDatum: new Date(),
            verstuurDatum: new Date(),
            status: 'In behandeling'
        }
        let apiResponse = await fetch(apiUrl, {method: 'POST', body:JSON.stringify(orderToPost), headers: new Headers({'content-type' : 'application/json'})});
        }
    GetCartData(){
        var shoppingCartData = [];
        shoppingCartData = JSON.parse(localStorage.getItem("Winkelmand"));
        if (shoppingCartData != null){
            return shoppingCartData;
        }
        else{
            return [];
        }
        
    }
    EmptyShoppingCart(){
        localStorage.removeItem("Winkelmand");
        this.setState({products: this.GetCartData(), totalPrice: this.CalcPrice(), ordered: true});
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
        this.SendBestellingenEmail(CartItems);
        CartItems.forEach(item => {
            if (User.IsUserLoggedIn()){
                this.PostOrderToDatabase(User.GetPK(),item.id)
            }
        });
        
        this.EmptyShoppingCart();
    }
    async SendBestellingenEmail(bestellingen){
        //TODO: remove hardcoded value from the body method, read it from the form input
        var toJsonProducten = JSON.stringify(bestellingen);
        bestellingen.forEach(element => {
            console.log(element)
            
        });
        var klantEmail = "0926477@hr.nl";
        var apiUrl = "api/Bestellingen/Post/Mail/" + toJsonProducten + "/" + klantEmail;
        let apiResponse = await fetch(apiUrl, {method: 'POST', body: null, headers: new Headers({'content-type' : 'application/json'})});

    }

    render() {
        if (User.IsUserLoggedIn() == true && this.state.ordered == false) {
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
                <p> Total Price: €{this.state.totalPrice}</p>
                
                <p> <button onClick={this.FinalizeOrder} > Bestellen </button> </p>

                </div>
            )
        }
        else if (this.state.ordered == true){
            return (
                <div className={"Container"}>
                    <div className="alert alert-success">
                        <strong>Bestelling successvol afgerond!</strong> De bestelling wordt verwerkt
                    </div>
                    <h3>U ontvangt een email ter bevestiging</h3>
                    <NavLink to={ '/' } exact activeClassName='active' className='LinksNav'>
                        <button className="btn btn-primary">Home</button>
                    </NavLink>
                </div>
            )
        }
        else
            {return (
                <div className={"Container"}>
                <h1>Afrekenen</h1>
                <p>Adres voor bezorging en incasso.</p>
                <form id="Afrekenform">
                    <li><input placeholder="voornaam" type="text" name="firstname" /> </li>
                    <li><input placeholder="achternaam" type="text" name="lastname" /> </li>
                    <li><input placeholder='straatnaam' type="text" name="streetname" /> </li>
                    <li><input placeholder="postcode" type="text" name="postcode" /> </li>
                    <li><input placeholder="email" type="text" name="email" /> </li>
                </form>
                
                <p> Total Price: €{this.state.totalPrice}</p>
                <p> <button onClick={this.FinalizeOrder} > Bestellen </button> </p> 
                </div>
            )
        }
        }
    }
    
        
export default Afrekenen;
