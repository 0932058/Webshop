
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image';
import {game, order, console, category} from "../DatabaseSimulation/TableTypes"
import {orderTabledata, gameTableData,consoleTableData} from "../DatabaseSimulation/FakeDatabase";
import {BestellingenComponent} from "./BestellingenComponent";
import {List} from "linqts";
import {User} from "../User/User";

interface BestellingenContainerState{
    orders: List<order> //The order of the customers without the products combined with it
    orderAndProductCombined: List<any>  //Customer order information and product information combined
    loaded: boolean; //In case the orders are not loaded, a load text appears on screen
    PKLoggedInUser: number; //Primary key of the logged in user
}
export class BestellingenContainer extends React.Component<RouteComponentProps<{}>, BestellingenContainerState> {
    constructor(){
        super();
        //If the user is logged in, it gets the PK of the logged in user and adds it to the state
        var loggedInUserPK = User.IsUserLoggedIn? User.GetPK() : 0
        this.GetCustomerOrders = this.GetCustomerOrders.bind(this);
        this.LoopThroughOrders = this.LoopThroughOrders.bind(this);
        this.state = {orders: new List<order>(), orderAndProductCombined: new List<any>(), loaded: false, PKLoggedInUser: loggedInUserPK}
    }
    //loadData method is an async operation, the program counter continues while the items are being fetched from the database
    //GetCustomersOrders is given as argument the PK of the customer who is logged in
    componentWillMount(){
        let loadData : () => void = () =>
        this.GetCustomerOrders().then(foundOrders => this.setState({orders: foundOrders}))
        .then(this.LoopThroughOrders)
        .catch(loadData)
        loadData();
    }
    //Gets the orders of the customer
    GetCustomerOrders(): Promise<List<order>>{
        var foundOrders = orderTabledata.Where(order => order.accountFK == this.state.PKLoggedInUser);
        return Promise.resolve<List<order>>(foundOrders);
   }  
   //Combines the order and product information
   LoopThroughOrders(){
       var foundGames = this.state.orders.Where(o => o.productForeignKeyReference == category.games).Join(gameTableData, order => order.productFK, game => game.pk, (o,g) =>  ({image: g.image, name: g.name, price: g.price, orderDate: o.orderdate, orderStatus: o.statusOfOrder})); 
       var foundConsoles = this.state.orders.Where(o => o.productForeignKeyReference == category.consoles).Join(consoleTableData, order => order.productFK, game => game.pk, (o,g) =>  ({image: g.image, name: g.name, price: g.price, orderDate: o.orderdate, orderStatus: o.statusOfOrder})); 
       var productsCombined = foundGames.Concat(foundConsoles).ToList() // combines the games and consoles
       this.setState({orderAndProductCombined: productsCombined, loaded: true})
   }
    render() {   
        return ( 
            <div className={"BestellingenContainer"}>
                {this.state.loaded? 
                this.state.orderAndProductCombined.ToArray().map((order,index) => 
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