
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image';
import {game, order, console, category} from "../DatabaseSimulation/TableTypes"
import {orderTabledata, gameTableData,consoleTableData} from "../DatabaseSimulation/FakeDatabase";
import {BestellingenComponent} from "./BestellingenComponent";
import {List} from "linqts";

interface BestellingenContainerState{
    orders: List<order> //The order of the customers without the products combined 
    orderAndProductCombined: List<any>  //Customer order information and product information combined
    loaded: boolean; //In case the orders are not loaded, a load text appears on screen
}
export class BestellingenContainer extends React.Component<RouteComponentProps<{}>, BestellingenContainerState> {
    constructor(){
        super();
        this.GetCustomerOrders = this.GetCustomerOrders.bind(this);
        this.LoopThroughOrders = this.LoopThroughOrders.bind(this);
        this.GetProductThatMatchesOrder = this.GetProductThatMatchesOrder.bind(this);
        this.state = {orders: new List<order>(), orderAndProductCombined: new List<any>(), loaded: false}
    }
    //loadData method is an async operation, the program counter continues while the items are being fetched from the database
    //GetCustomersOrders is given as argument the PK of the customer who is logged in
    componentWillMount(){
        let loadData : () => void = () =>
        this.GetCustomerOrders(1).then(foundOrders => this.setState({orders: foundOrders}))
        .then(this.LoopThroughOrders)
        .catch(loadData)
        loadData();
    }
    //Gets the orders of the customer
    GetCustomerOrders(customerID: number): Promise<List<order>>{
        var foundOrders = orderTabledata.Where(order => order.accountFK == customerID);
        return Promise.resolve<List<order>>(foundOrders);
   }  
   //The orders are going to get looped through, this is to get both the order and product information combined
   LoopThroughOrders(){
       //the: "this" keyword is not seen in the foreach block, that is why the methods are being replicated 
    let GetProductThatMatchesOrder: (order:order, category1: category) => any =
     (order:order,category1: category) => this.GetProductThatMatchesOrder(order,category1);
       let orders: List<any> = new List<any>(); //the combined order and product info get stored in this list
       this.state.orders.ForEach(function(order){
            var foundOrder = GetProductThatMatchesOrder(order, order.productForeignKeyReference)
            orders.Add(foundOrder)
        }
    )
     this.setState({orderAndProductCombined: orders, loaded:true})
    }  
    //Combines the product and the order information
   GetProductThatMatchesOrder(order: order, productType: category){
       var foundProduct;
       switch(productType){
           case(category.accessoires):
            break;
            case(category.consoles):
            console.log("CONSOLE!")
            foundProduct = consoleTableData.Where(console => console.pk == order.productFK);
            break;
            case(category.games):
            foundProduct = gameTableData.Where(game => game.pk == order.productFK);
            break;
       }
       //converted to array to get items by index
       var foundProductToArray = foundProduct.ToArray();
       var productWithOrderInfo = {image: foundProductToArray[0].image, name:  foundProductToArray[0].name, price:  foundProductToArray[0].price, 
    orderDate: order.orderdate, orderStatus: order.statusOfOrder}
    return productWithOrderInfo;
   }
    render() {   
        //Converted to get the Map function
        var listconverted = this.state.orderAndProductCombined.ToArray()
        return ( 
            <div>
                {this.state.loaded? 
                listconverted.map((order,index) => 
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