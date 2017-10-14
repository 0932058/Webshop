
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image';
import {game, order} from "../DatabaseSimulation/TableTypes"
import {orderTabledata, gameTableData} from "../DatabaseSimulation/FakeDatabase";
import {BestellingenComponent} from "./BestellingenComponent";

interface BestellingenContainerState{
    orders: order[]
}
export class BestellingenContainer extends React.Component<RouteComponentProps<{}>, BestellingenContainerState> {
    constructor(){
        super();
        this.GetCustomerOrders = this.GetCustomerOrders.bind(this);
        this.state = {orders:[]}
    }
    componentWillMount(){
        this.GetCustomerOrders(1); //Customer id gets loaded, depended on the customer that is logged in. 
    }
    GetCustomerOrders(customerID: number){
        var customerOrders: order[] = [] 
        orderTabledata.map(order => {
                if(order.accountFK == customerID){
                    console.log("FOUND!")
                        customerOrders.push(order)        
                }               
                this.setState({orders: customerOrders})              
            }
        )
   }  
   lolling(){
       select f in gameTableData.
   }

    render() {
        return ( 
            <div>        
                {this.state.orders.map(order => {
                    gameTableData.map(gameProduct => {
                        if(order.productFK == gameProduct.pk){
                            <BestellingenComponent key={gameProduct.pk} image={gameProduct.image} name={gameProduct.name} price={gameProduct.price} 
                            orderDate={order.orderdate} status={order.statusOfOrder}/>
                        }                        
                    }
                    
                )
                
            })
        }
        </div>
        )}
   
}
export default BestellingenContainer;