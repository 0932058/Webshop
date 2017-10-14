import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image'
import {game, order} from "../DatabaseSimulation/TableTypes"

interface BestellingenState{
    orders: order[] 
}
interface BestellingenProps{
    image: string,
    name: string,
    price: number,
    orderDate: string | null
    status: string | null
}
export class BestellingenComponent extends React.Component<BestellingenProps, BestellingenState> {
    constructor(props: any){
        super(props);
        this.state = {orders:[]}
        console.log("bestellingen is mounted")
        console.log(this.state.orders[0].statusOfOrder)

    }
    componentWillMount(){
        console.log("HELLO!")
    }
        
    render() {
            return (
            <div className={"Order"}>      
            <h1>Bestellingen</h1>
            <div>
            <li>  <img src={this.props.image}  height={700}/> </li>
            <div> <h2> Naam: {this.props.name} </h2> </div>
            <div> <h2> Prijs: {"€" + this.props.price.toFixed(2)} </h2> </div>
            <div> <h2> Besteld op: {this.props.orderDate} </h2></div>
            <div> <h2> Status: {this.props.status} </h2></div>
            </div> 
            </div>      
            )}
            
}

export default BestellingenComponent;