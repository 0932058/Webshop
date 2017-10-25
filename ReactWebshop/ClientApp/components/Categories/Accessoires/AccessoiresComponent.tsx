import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {product, category,game,accessoires}  from '../../DatabaseSimulation/TableTypes';


interface AccessoiresComponentProps{
    accessoiresToShow: accessoires;
    ToProductPage(event: any, accessoires: accessoires)
}
export class AccessoiresComponent extends React.Component<AccessoiresComponentProps, {}> {
    constructor(props: any){
        super(props);   
    }
    render(){
        return <div className={"Component"}>                  
                    <div>
                    <h1>{this.props.accessoiresToShow.category}</h1>
                    <h1>{this.props.accessoiresToShow.name}</h1>
                    <li>  <img src={this.props.accessoiresToShow.image}  height={300}/> </li>
                    <div> <h2> Naam: {this.props.accessoiresToShow.name} </h2> </div>
                    <div> <h2> Prijs: {"€" + this.props.accessoiresToShow.price.toFixed(2)} </h2> </div>
                    <h2> <button onClick={(e:any) => this.props.ToProductPage(e,this.props.accessoiresToShow)}> Product page  </button> </h2>        
                    </div> 
                    </div>                
    }
}
export default AccessoiresComponent;