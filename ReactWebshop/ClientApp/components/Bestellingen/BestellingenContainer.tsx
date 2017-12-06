import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image';
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
    GetOrders(){
        fetch('api/Bestellingen' + this.state.PKLoggedInUser)
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
            var Orderproduct = {"Productnaam": product.productNaam,"Image": product.productImg ,"Besteldatum": order.bestellingDatum, "Verstuurdatum": order.verstuurDatum, "Status": order.status,"Prijs": product.productPrijs};
            OrderProducts.push();
        })
        this.setState({orderAndProductCombined: OrderProducts});
    }
    componentDidMount(){
        this.GetOrders();
        this.MakeOrderProducts();
        this.setState({loaded: true});
    }
a
    render() {   
        return ( 
            <div className={"Container"}>
            <h1>Bestellingen</h1>
                {this.state.loaded? 
                this.state.orderAndProductCombined.map((order) => 
                {return (
                    <div className={"Component"}>
                    <img src={order.Image}/>
                    <div className="ComponentInfo">
                     <h1> Naam: {order.Productnaam} </h1> 
                     <h2> Prijs: {"€" + order.Prijs.toFixed(2)} </h2> 
                     <h2> Besteld op: {order.bestellingDatum} </h2>
                     <h2> Status: {order.Status} </h2>
                     {order.Verstuurdatum != null? (
                         <h2> Verzonden op: {order.Verstuurdatum}</h2>
                     ) 
                     :
                     (<h2>Nog niet verzonden.</h2>)   
                     }
                    </div> 
                    </div>       
                    );})
                :
                <h1> Loading the orders... </h1>           
            }
            </div> 
        );
    }
}           
export default BestellingenContainer;