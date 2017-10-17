import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {product, category,game}  from '../../DatabaseSimulation/TableTypes';

//Games component

interface GamesComponentProps{
    gameToShow: game;
    ToProductPage(event: any, game: game)
}
interface GamesComponentState{   
}
export class GamesComponent extends React.Component<GamesComponentProps, GamesComponentState> {
    constructor(props: any){
        super(props);   
    }
    render(){
        return <div className={"Game"}>                  
                    <div>
                    <h1>{this.props.gameToShow.console}</h1>
                    <h1>{this.props.gameToShow.name}</h1>
                    <li>  <img src={this.props.gameToShow.image}  height={300}/> </li>
                    <div> <h2> Naam: {this.props.gameToShow.name} </h2> </div>
                    <div> <h2> Prijs: {"€" + this.props.gameToShow.price.toFixed(2)} </h2> </div>
                    <h2> <button onClick={(e:any) => this.props.ToProductPage(e,this.props.gameToShow)}> Product page  </button> </h2>        
                    </div> 
                    </div>                
    }
}
export default GamesComponent;