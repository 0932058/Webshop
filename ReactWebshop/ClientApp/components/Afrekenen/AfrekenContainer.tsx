import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../Storage/ReusableComponents/Storage";
import {User} from "../User/User";
import { Redirect } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap';
import {Bestelling, Klant, KlantEnBestelling} from "../Items/ItemsInterfaces";
import { Product } from 'ClientApp/components/Items/ItemsInterfaces';

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
            formVoornaam: "",
            formAchternaam: "",
            formStraatnaam: "",
            formPostcode: "",
            formEmail: "",
            productdata: []
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
        if(User.IsUserLoggedIn()){
            var klant: Klant = {
                voornaam: User.GetFirstname(),
                achternaam: User.GetLastname(),
                straatnaam: User.GetStreetname(),
                postcode: User.getPostcode(),
                email: User.GetEmail()}        
        }
        else{
            var klant: Klant = {
                voornaam: this.state.formVoornaam,
                achternaam: this.state.formAchternaam,
                straatnaam: this.state.formStraatnaam,
                postcode: this.state.formPostcode,
                email: this.state.formEmail}
        }
        var klantEnBestelling: KlantEnBestelling = {
            klant: klant,
            bestellingen: bestellingen}
        var apiUrl = "api/Bestellingen/Post/Mail/"
        let apiResponse = await fetch(apiUrl, {method: 'POST', body: JSON.stringify(klantEnBestelling), headers: new Headers({'content-type' : 'application/json'})});

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
                <ul>
                <form action="/action_page.php" onSubmit={this.FinalizeOrder} >
                <li className='reg_li'>
                        <p>Voornaam</p>
                        <input placeholder="voornaam" pattern="[a-z]{1,15}" title="voornaam moet bestaan uit 1 tot en met 15 letters"
                        type="text" name="firstname" className="form-control"  onChange={(event: any) => {this.setState({formVoornaam: event.target.value})}} />
                        
                    </li>              
                    <li className='reg_li'>
                        <p>Achternaam</p>
                        <input placeholder="achternaam" pattern="[a-z]{1,30}" title="achternaam moet bestaan uit 1 tot 30 letters" 
                        type="text" name="lastname" className="form-control"  onChange={(event: any) => {this.setState({formAchternaam: event.target.value})}} />
                    </li>            
                    <li className='reg_li'>
                        <p>Straatnaam</p>
                        <input placeholder='straatnaam' pattern="([a-zA-Z]).{2,30}([0-9]).{0,3}" title="vul een juist adres in"
                        type="text" name="streetname"className="form-control" onChange={(event: any) => {this.setState({formStraatnaam: event.target.value})}}  />
                    </li>            
                    <li className='reg_li'>
                        <p>Postcode</p>
                        <input placeholder="postcode" pattern="([0-9]){4}([A-Z]){2}" title="postcode moet uit 4 cijfers en 2 letters bestaan" 
                        type="text" name="postcode"className="form-control"  onChange={(event: any) => {this.setState({formPostcode: event.target.value})}} />
                    </li>
                    <li className='reg_li'>
                    <p>Email</p>
                    <input placeholder="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[.]+[a-z]{2,3}$" 
                    title='zorg dat het een juist email is vb. characters@characters.domain'
                    type="text" name="email"className="form-control" onChange={(event: any) => {this.setState({formEmail: event.target.value})}}/>
                </li> 
                <br/>
                    <input placeholder="Afrekenen" type="submit" value="Bestellen"/>
                    </form>
                    </ul>            
                <p> Total Price: €{this.state.totalPrice}</p>
                </div>
            )
        }
        }
    }
    
        
export default Afrekenen;
