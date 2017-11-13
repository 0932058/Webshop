import * as React from 'react';
import Img from 'react-image'

interface BestellingenProps{
    image: string;
    name: string;
    price: number;
    orderDate: string;
    orderStatus: string;
}
export class BestellingenComponent extends React.Component<BestellingenProps, {}> {
    constructor(props: any){
        super(props);
    }
    render() {
            return (
            <div className={"Component"}>
            <img src={this.props.image}/>
            <div className="ComponentInfo">
             <h1> Naam: {this.props.name} </h1> 
             <h2> Prijs: {"€" + this.props.price.toFixed(2)} </h2> 
             <h2> Besteld op: {this.props.orderDate} </h2>
             <h2> Status: {this.props.orderStatus} </h2>
            </div> 
            </div>       
            )}          
}

export default BestellingenComponent;