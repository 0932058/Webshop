import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image';
import {BestellingenComponent} from "./BestellingenComponent";
import {List} from "linqts";
import {User} from "../User/User";

interface BestellingenContainerState{
    orders: any[];
    orderAndProductCombined: any[];
    loaded: boolean; //In case the orders are not loaded, a load text appears on screen
    PKLoggedInUser: number; //Primary key of the logged in user
}
export class BestellingenContainer extends React.Component<RouteComponentProps<{}>, BestellingenContainerState> {
    constructor(){
        super();
        //If the user is logged in, it gets the PK of the logged in user and adds it to the state
        var loggedInUserPK = User.IsUserLoggedIn? User.GetPK() : 0;
        this.state = {orders: [], orderAndProductCombined: [], loaded: false, PKLoggedInUser: loggedInUserPK}
    }
    GetOrders(klantId){
        fetch('api/Bestellingen' + klantId)
        .then(response => response.json() as Promise<Bestelling[]>)
        .then(data =>{
            this.setState({orders: data});
        });
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
        this.state.orders.forEach(order =>{
            var product = this.GetOrderData(order.productId);
            var Orderproduct = {"Productnaam": product.productNaam,"Besteldatum": order.bestellingDatum, "Verstuurdatum": order.verstuurDatum, "Status": order.status}
            OrderProducts.push()
        })
    }

    render() {   
        return ( 
            <div className={"Container"}>
            <h1>Bestellingen</h1>
                {this.state.loaded? 
                this.state.orderAndProductCombined.map((order,index) => 
                    <BestellingenComponent key={index} image={order.image} name={order.name}
                    price={order.price} orderDate={order.orderDate} orderStatus={order.orderStatus}/>)
                :
                <h1> Loading the orders... </h1>           
            }
            </div> 
        );
    }
}           
export default BestellingenContainer;