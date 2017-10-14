
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image';
import {game, order} from "../DatabaseSimulation/TableTypes"
import {orderTabledata, gameTableData} from "../DatabaseSimulation/FakeDatabase";
import {BestellingenComponent} from "./BestellingenComponent";
import {List} from "linqts";


interface BestellingenContainerState{
    orders: List<order>
    joinedTable: List<any>
}
export class BestellingenContainer extends React.Component<RouteComponentProps<{}>, BestellingenContainerState> {
    constructor(){
        super();
        this.GetCustomerOrders = this.GetCustomerOrders.bind(this);
        this.CreateJoinTable = this.CreateJoinTable.bind(this);
        this.state = {orders: new List<order>(), joinedTable: new List<any>()}
    }
    componentWillMount(){
        this.GetCustomerOrders(1); //Customer id gets loaded, depended on the customer that is logged in. 
    }
    GetCustomerOrders(customerID: number){
        var foundOrders = orderTabledata.Where(order => order.accountFK == customerID);
        this.setState({orders: foundOrders})       
   }  
   CreateJoinTable(){
       let joinedOrderAndProduct;
        var query = orderTabledata.Join(gameTableData, order => order.productFK, product => product.pk,
            (order,product) => ({image: product.image, name: product.name, price: product.price, 
                orderDate: order.orderdate, orderStatus: order.statusOfOrder}))
                this.setState({joinedTable: query}) 
                } 
    render() {
        return ( 
            <div>
                Hello
                {this.state.joinedTable.ForEach(customerOrder => {
                    <BestellingenComponent key ={customerOrder.pk} image={customerOrder.image} name={customerOrder.name}
                    price={customerOrder.price} orderDate={customerOrder.orderDate} status={customerOrder.orderStatus}/>
               
                })
            }
             </div>
            
        )}
        
           

}
export default BestellingenContainer;