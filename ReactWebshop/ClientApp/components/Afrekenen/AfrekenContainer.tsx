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
            products: [], 
            customerID: loggedInUserPK, 
            isShoppingCart:true, 
            loaded:false, 
            totalPrice: this.CalcPrice(),
            ordered: false,
            formVoornaam: "",
            formAchternaam: "",
            formStraatnaam: "",
            formStraatnummer: "",
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

    componentDidMount(){
        this.setState({
            products: this.GetCartData(),
            loaded: true
        })
        console.log(this.GetCartData())
    }

    BuildOrders(klantId){
        let res = [];
        this.state.products.forEach(product =>{
            let order: Bestelling = {
                BestellingId: 0, 
                klantId: klantId,
                productId: product.id,
                bestellingDatum: new Date(),
                verstuurDatum: new Date(),
                status: 'In behandeling',
                groupId: 0
            }
            res.push(order);
        })
        return res;
    }
    async PostOrderToDatabase(klantId){
        let apiUrl = 'api/Bestellingen/Post'
        let ordersToPost = this.BuildOrders(klantId)
        let apiResponse = await fetch(apiUrl, {method: 'POST', body:JSON.stringify(ordersToPost), headers: new Headers({'content-type' : 'application/json'})});
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
        this.PostOrderToDatabase(this.state.customerID);
        this.EmptyShoppingCart();
    }
    async SendBestellingenEmail(bestellingen){
        if(User.IsUserLoggedIn()){
            var klant: Klant = {
                voornaam: User.GetFirstname(),
                achternaam: User.GetLastname(),
                straatnaam: User.GetStreetname(),
                straatnummer: User.GetStreetnumber(),
                postcode: User.getPostcode(),
                email: User.GetEmail()}        
        }
        else{
            var klant: Klant = {
                voornaam: this.state.formVoornaam,
                achternaam: this.state.formAchternaam,
                straatnaam: this.state.formStraatnaam,
                straatnummer: this.state.formStraatnummer,
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
                
                
                    <div className='Container'>
                    <div className='row'>
                    <div className='col-md-4'>
                    <p><b>Adres voor bezorging en incasso</b></p>
                        <p><b>Naam</b></p>
                        <p>{User.GetFirstname() + ' ' + User.GetLastname()}</p>

                    
                        <p><b>Adres</b></p>
                        <p>{User.GetStreetname() + ' ' + User.GetStreetnumber()}</p>
                        <p>{User.getPostcode()}</p>
                    
                    
                        <p><b>Email</b></p>
                        <p>{User.GetEmail()}</p>
                        <div className='col-md-4'>
                        <p> <b>Total Price:</b> €{this.state.totalPrice}</p>
                
                <p> <button className='btn btn-success' onClick={this.FinalizeOrder} > Bestellen </button> </p>
                </div>
                        </div>
                        <div className='col-md-6'>
                        <p><b>Bestel overzicht</b></p>
                        {this.state.loaded?this.state.products.map(
                            item =>{
                                return(
                                    <div className={"Component"}>
                                    <div className='col-md-12'>
                                    <div className='col-md-3'><img className="img-responsive" src={item.image}/></div>
                                    <p><b>Product Naam:</b>{item.name}</p>
                                    <p><b>Console type:</b>{item.console}</p>
                                    <p><b>Stuk prijs:</b>{"€"+item.price}</p>

                                    </div>
                                    </div>
                                )
                            }
                        )
                        :
                        null    
                    }
                    </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.ordered == true){
            return (
                <div className={"Container"}>
                    <h3>U ontvangt een email ter bevestiging</h3>
                    <div className="alert alert-success">
                        <strong>Bestelling successvol afgerond!</strong> De bestelling wordt verwerkt
                    </div>
                    <NavLink to={ '/' } exact activeClassName='active' className='LinksNav'>
                        <button className="btn btn-primary">Home</button>
                    </NavLink>
                    <NavLink to={ '/Bestellingen' } className='LinksNav'>
                        <button className="btn btn-primary">Naar bestellingen</button>
                    </NavLink>
                </div>
            )
        }
        else
            {return (
                <div className="Container col-md-6">
                <h1>Afrekenen</h1>
                <p>Adres voor bezorging en incasso.</p>
                <ul>
                <form action="/action_page.php" onSubmit={this.FinalizeOrder} >
                    <div className="row">
                        <div className="col-md-6">
                            <p>Voornaam*</p>
                            <input required placeholder="voornaam"  pattern="[a-zA-Z]{1,15}" title="voornaam moet bestaan uit 1 tot en met 15 letters"
                            type="text" name="firstname" className="form-control"  onChange={(event: any) => {this.setState({formVoornaam: event.target.value})}} />
                        </div>
                        <div className="col-md-6">
                            <p>Achternaam*</p>
                            <input required placeholder="achternaam" pattern="[a-z A-Z /s]{1,30}" title="achternaam moet bestaan uit 1 tot 30 letters" 
                            type="text" name="lastname" className="form-control"  onChange={(event: any) => {this.setState({formAchternaam: event.target.value})}} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p>Straatnaam*</p>
                            <input required placeholder='straatnaam' pattern="[a-zA-Z]{2,30}" title="vul een juist adres in"
                            type="text" name="streetname"className="form-control" onChange={(event: any) => {this.setState({formStraatnaam: event.target.value})}}  />
                        </div>
                        <div className="col-md-3">
                            <p>Straatnummer*</p>
                                <input placeholder='bijv. 66' pattern="[0-9]{0,3}" 
                                type="number" name="streetnumber" className="form-control" onChange={(event: any) => {this.setState({formStraatnummer: event.target.value})}} />
                            </div>
                        <div className="col-md-3">
                            <p>Toevoeging</p>
                                <input placeholder="bijv. 'b'" pattern="[a-zA-Z]{1}"
                                type="text" name="numberaddition" className="form-control"/>
                            </div>
                        </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p>Postcode*</p>
                            <input required placeholder="postcode" pattern="[1-9][0-9]{3}\s?[a-zA-Z]{2}" title="postcode moet uit 4 cijfers en 2 letters bestaan" 
                            type="text" name="postcode"className="form-control"  onChange={(event: any) => {this.setState({formPostcode: event.target.value})}} />
                        </div>
                        <div className="col-md-6">
                            <p>Telefoonnummer*</p>
                            <input placeholder="telefoonnummer" pattern="[0-9]{1,30}" title="Telefoonnummer moet alleen uit cijfers bestaan"
                            type="tel" name="phonenumber" className="form-control" required={true} />
                        </div>
                    </div>
                    <div>
                        <p>Email*</p>
                        <input required placeholder="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]+[a-z]{2,3}$" 
                        title='zorg dat het een juist email is vb. characters@characters.domain'
                        type="text" name="email"className="form-control" onChange={(event: any) => {this.setState({formEmail: event.target.value})}}/>
                    </div>
                    <h6>
                        <strong>Velden met * zijn verplicht!</strong>
                    </h6>
                    <input className="btn btn-success"placeholder="Afrekenen" type="submit" value="Bestellen"/>
                    </form>
                    </ul>            
                <p> Total Price: €{this.state.totalPrice}</p>
                </div>
            )
        }
        }
    }
    
        
export default Afrekenen;
