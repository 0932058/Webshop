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
             <h3> Naam: {this.props.name} </h3> 
             <h3> Prijs: {"€" + this.props.price.toFixed(2)} </h3> 
             <h3> Besteld op: {this.props.orderDate} </h3>
             <h3> Status: {this.props.orderStatus} </h3>
            </div> 
            </div>       
            )}          
}

export default BestellingenComponent;