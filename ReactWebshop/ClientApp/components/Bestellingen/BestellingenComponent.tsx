import * as React from 'react';
import Img from 'react-image'

interface BestellingenState{
    orders: any[] 
}
interface BestellingenProps{
    image: string | any,
    name: string | any,
    price: number | any,
    orderDate: string | any,
    orderStatus: string | any
}
export class BestellingenComponent extends React.Component<BestellingenProps, BestellingenState> {
    constructor(props: any){
        super(props);
        this.state = {orders:[]}
    }
    render() {
            return (
            <div className={"BestellingenComponent"}>      
            <h1>Bestellingen</h1>
            <div>
            <li>  <img src={this.props.image}  height={300}/> </li>
            <div> <h2> Naam: {this.props.name} </h2> </div>
            <div> <h2> Prijs: {"€" + this.props.price.toFixed(2)} </h2> </div>
            <div> <h2> Besteld op: {this.props.orderDate} </h2></div>
            <div> <h2> Status: {this.props.orderStatus} </h2></div>
            </div> 
            </div>        
            )}          
}

export default BestellingenComponent;