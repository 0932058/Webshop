import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {product, category,game, console}  from '../../DatabaseSimulation/TableTypes';

//Consoles component

interface ConsolesComponentProps{
    consoleToShow: console;
    ToProductPage(event: any, game: console)
}
export class ConsolesComponent extends React.Component<ConsolesComponentProps, {}> {
    constructor(props: any){
        super(props);   
    }
    render(){
        return <div className={"Component"}>                  
                    <img src={this.props.consoleToShow.image}/>
                    <div className="ComponentInfo" > <h2>{this.props.consoleToShow.name} </h2>
                    <p> Prijs: {"€" + this.props.consoleToShow.price.toFixed(2)} </p>
                    <h2> <button onClick={(e:any) => this.props.ToProductPage(e,this.props.consoleToShow)}> Product page  </button> </h2>        
                    </div> 
                    </div>                
    }
}
export default ConsolesComponent;