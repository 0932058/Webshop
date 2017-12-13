import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image';
import {List} from "linqts";
import {User} from "../User/User";
import {AbstractStorage,StorageState} from "../Storage/ReusableComponents/Storage";

export class BestellingenContainer extends AbstractStorage {
    constructor(){
        super();
        //If the user is logged in, it gets the PK of the logged in user and adds it to the state;
        this.state = {customerID: User.GetPK(), products: [], isShoppingCart:false, loaded:false, totalPrice: 0, ordered: true}
    }
    GetOrders(){
        fetch('api/Bestellingen/Get/' + User.GetPK())
        .then(response => response.json() as Promise<Bestelling[]>)
        .then(data =>{
           console.log("GetOrders geeft " + data[0]);
           this.setState({products: data, loaded: true})
        });
    }
    GetOrderName(productId){
        var res;
        fetch('api/Items/' + productId)
        .then(response => response.json() as Promise<Product[]>)
        .then(data => {
            res = data[0].productNaam;
        });
        return res;
    }/*
    MakeOrderProducts(){
        var orders = [];
        fetch('api/Bestellingen/Get/' + User.GetPK())
        .then(response => response.json() as Promise<Bestelling[]>)
        .then(data =>{
           orders = data;
        });
        var orderProducts = [];
        if (orders != null){orders.forEach( order =>{
            console.log(order.productId);
            var product = this.GetOrderData(order.productId);
            var orderProduct = {"Productnaam": product.productNaam,"Image": product.productImg ,"Besteldatum": order.bestellingDatum, "Verstuurdatum": order.verstuurDatum, "Status": order.status,"Prijs": product.productPrijs};
            orderProducts.push(orderProduct);
            });
            console.log("MakeOrderProducts geeft " + orderProducts[0])
            this.setState({loaded: true,products: orderProducts});}
        else{
            console.log("Orders zijn niet geladen")
        }
        
    }*/
    componentWillMount(){
        this.GetOrders();
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
                {this.state.loaded ?
                    this.state.products.map(
                    order =>{
                        return(
                            <div className={"Component"}>
                            <div className='container'>
                                <div className="panel panel-default">    
                                    <div className='col-md-2'>
                                        <div className="panel-body"><img className="img-responsive" src={order.Image}/></div>
                                    </div>
                                    <div className='col-md-4'>
                                        <p>{() => this.GetOrderName(order.productId)}</p>
                                        <p>Naam: {() => this.GetOrderName(order.productId)}</p>
                                        <p>Status: {order.status}</p>
                                        <p>Besteldatum: {order.bestellingDatum}</p>
                                        <p>Verstuurdatum: {order.verstuurDatum}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    }

                )
                :
                <p>Uw bestellingen worden geladen</p>
                }


                </div>


        </div>
        );
    }
}           
export default BestellingenContainer;