import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../ReusableComponents/Storage";
import {WensLijstComponent} from "./WensLijstComponent";
import {User} from "../../User/User";
import { Product, Bestelling } from 'ClientApp/components/Items/ItemsInterfaces';

export class WensLijstContainer extends AbstractStorage {
    constructor(){
        super();
        this.state = {
            customerID: null, 
            isShoppingCart:false, 
            loaded:false, 
            totalPrice: null,
            products: this.GetWishlist(), 
            ordered: false, 
            formVoornaam: "",
            formAchternaam: "",
            formStraatnaam: "",
            formPostcode: "",
            formEmail: ""
        }
    }
    AddProductToShoppingCartLocalStorage(product){
        var itemlist = [];
        itemlist = JSON.parse(localStorage.getItem("Winkelmand"));
        if (itemlist != null){
            var item = {"name" : product.productNaam, "id" : product.productId, "price": product.productPrijs, "index" : itemlist.length, "console": product.consoleType, "image": product.productImg};
            itemlist.push(item)
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
            
        }
        else{
            var item = {"name" : product.productNaam, "id" : product.productId, "price": product.productPrijs, "index" : 0, "console": product.consoleType, "image": product.productImg};
            itemlist = [item]
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
        }
    }
    RemoveItemFromStorage(naam){
        var oldlist = [];
        var newlist = [];
        oldlist = this.GetWishlist();
        var producttoremove = oldlist.find(product => product.productNaam == naam);
        oldlist.forEach(product => {
            if (product.productNaam != producttoremove.productNaam){
                newlist.push(product);
            }
        })

        this.setState({products: newlist});
    }
    GetOrderData(productId){
        var product;
        fetch('api/Items/' + productId)
        .then(response => response.json() as Promise<Product[]>)
        .then(data => {
            product = data[0];
        });
        return product;
    }
    GetWishlist(){
        var wishlist = [];
        fetch('api/Wenslijsten/Get/' + User.GetPK())
        .then(response => response.json() as Promise<Bestelling[]>)
        .then(data =>{
            wishlist = data;
        });
        var res = [];
        wishlist.forEach(wishlistitem =>{
            var product = this.GetOrderData(wishlistitem.productId);
            var productdata = {"Productnaam": product.productNaam,"Image": product.productImg , "Prijs": product.productPrijs};
            res.push(productdata);
        })
        return res;
        
    }
    render() {
        return (
            
        <div className={"Container"}>
            <div className='container'>
                <div className='col-md-9'>
                <h1>Wenslijst</h1>
                </div>
                <div className='col-md-3'>
                </div>
            </div>
                <div>
                {this.state.products.map(
                    product =>{
                        return(
<div className={"Component"}>
<div className='container'>
    <div className="panel panel-default">    
        <div className='col-md-2'>
            <div className="panel-body"><img className="img-responsive" src={product.image}/></div>
        </div>
        <div className='col-md-4'>
            <p>{product.name}</p>
            <p>Naam: {product.name}</p>
            <p>Console: {product.console}</p>
            <p>Prijs: {"€" + (product.price).toFixed(2)}</p>
            </div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={this.AddProductToShoppingCartLocalStorage}>Toevoegen aan winkelmand</button>
                            <div className="modal fade" id="myModal" role="dialog">
                                <div className="modal-dialog modal-sm">
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Product is toegevoegd!</h4>
                                    </div>
                                    <div className="modal-body">
                                    <p>het door u gekozen item is succesvol toegevoegd aan de winkelmand</p>
                                    <button type="button" className="btn btn-default" data-dismiss="modal" data-backdrop="false">verder winkelen</button>
                                    <a href='/Winkelmand'><button type="button" className="btn btn-default" data-backdrop="false" >naar winkelmand</button></a>
                                    </div>
                                </div>
                                </div>
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