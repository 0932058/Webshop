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
        return <div className={"ConsolesComponent"}>                  
                    <div>
                    <h1>{this.props.consoleToShow.console}</h1>
                    <h1>{this.props.consoleToShow.name}</h1>
                    <li>  <img src={this.props.consoleToShow.image}  height={300}/> </li>
                    <div> <h2> Naam: {this.props.consoleToShow.name} </h2> </div>
                    <div> <h2> Prijs: {"€" + this.props.consoleToShow.price.toFixed(2)} </h2> </div>
                    <h2> <button onClick={(e:any) => this.props.ToProductPage(e,this.props.consoleToShow)}> Product page  </button> </h2>        
                    </div> 
                    </div>                
    }
}
export default ConsolesComponent;