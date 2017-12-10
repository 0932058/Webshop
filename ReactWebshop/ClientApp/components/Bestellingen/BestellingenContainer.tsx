import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image';
import {List} from "linqts";
import {User} from "../User/User";
import {AbstractStorage,StorageState} from "../Storage/ReusableComponents/Storage";

export class BestellingenContainer extends AbstractStorage {
    constructor(){
        super();
        //If the user is logged in, it gets the PK of the logged in user and adds it to the state
        var loggedInUserPK = User.IsUserLoggedIn? User.GetPK() : 0;
        this.state = {products: this.MakeOrderProducts(), isShoppingCart:false, loaded:false, totalPrice: 0, ordered: true, customerID: loggedInUserPK}
    }
    GetOrders(){
        var res = [];
        fetch('api/Bestellingen/Get/' + this.state.customerID)
        .then(response => response.json() as Promise<Bestelling[]>)
        .then(data =>{
           res = data;
        });
        return res;
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
    MakeOrderProducts(){
        var OrderProducts = [];
        this.GetOrders().forEach(order =>{
            var product = this.GetOrderData(order.productId);
            var Orderproduct = {"Productnaam": product.productNaam,"Image": product.productImg ,"Besteldatum": order.bestellingDatum, "Verstuurdatum": order.verstuurDatum, "Status": order.status,"Prijs": product.productPrijs};
            OrderProducts.push();
        });
        return OrderProducts;
    }
    render() {   
        return (
            
        <div className={"Container"}>
            <div className='container'>
                <div className='col-md-9'>
                <h1>Bestellingen</h1>
            </div>
            </div>
                <div>
                            <div className={"Component"}>
                            <div className='container'>
                                <div className="panel panel-default">    
                                    <div className='col-md-2'>
                                        <div className="panel-body"><img className="img-responsive"/></div>
                                    </div>
                                    <div className='col-md-4'>
                                        <p>Productnaam</p>
                                        <p>Productnaam</p>
                                        <p>Prijs</p>
                                        <p>Status</p>
                                        <p>Besteldatum</p>
                                        <p>Verstuurdatum</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    }

                }


                </div>


        </div>
        );/*
        return (
            
        <div className={"Container"}>
            <div className='container'>
                <div className='col-md-9'>
                <h1>Bestellingen</h1>
            </div>
            </div>
                <div>
                {this.state.orderAndProductCombined.map(
                    order =>{
                        return(
                            <div className={"Component"}>
                            <div className='container'>
                                <div className="panel panel-default">    
                                    <div className='col-md-2'>
                                        <div className="panel-body"><img className="img-responsive" src={order.Image}/></div>
                                    </div>
                                    <div className='col-md-4'>
                                        <p>{order.Productnaam}</p>
                                        <p>Naam: {order.Productnaam}</p>
                                        <p>Prijs: {order.Prijs}</p>
                                        <p>Status: {order.Status}</p>
                                        <p>Besteldatum: {order.Besteldatum}</p>
                                        <p>Verstuurdatum: {order.Verstuurdatum}</p>
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
        );*/
    }
}           
export default BestellingenContainer;