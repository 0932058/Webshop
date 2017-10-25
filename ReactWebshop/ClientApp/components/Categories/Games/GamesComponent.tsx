import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {product, category,game}  from '../../DatabaseSimulation/TableTypes';

//Games component

interface GamesComponentProps{
    gameToShow: game;
    ToProductPage(event: any, game: game)
}
export class GamesComponent extends React.Component<GamesComponentProps, {}> {
    constructor(props: any){
        super(props);   
    }
    render(){
        return <div className={"Component"}>
                    <img src={this.props.gameToShow.image}/>
                    <div className="ComponentInfo"> <h2>{this.props.gameToShow.name} </h2>
                    <p>Console: {this.props.gameToShow.console}</p>
                    <p> Prijs: {"€" + this.props.gameToShow.price.toFixed(2)} </p>
                    <h2> <button onClick={(e:any) => this.props.ToProductPage(e,this.props.gameToShow)}> Productpagina  </button> </h2>        
                    </div> 
                    </div>                
    }
}
export default GamesComponent;