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
                     <img src={this.props.accessoiresToShow.image}></img>
                     <div className="ComponentInfo">
                    <h2> {this.props.accessoiresToShow.name} </h2>
                    <p> Prijs: {"€" + this.props.accessoiresToShow.price.toFixed(2)} </p>
                    <p> <button onClick={(e:any) => this.props.ToProductPage(e,this.props.accessoiresToShow)}> Productpagina  </button> </p>        
                    </div> 
                    </div>                
    }
}
export default AccessoiresComponent;