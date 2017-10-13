import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image'
import {game} from "./Database(Simulation)/TableTypes";
import {gameTableData} from "./Database(Simulation)/TablesInArray";
import {localStorageType} from "./LocalStorage/localStorageTypes";

interface BestellingenState{
    games: game[] //The games from the local storage gets saved in the array
    isThereAnOrder: boolean; //If there is no order, than a different text gets loaded
}
export class Bestellingen extends React.Component<RouteComponentProps<{}>, BestellingenState> {
    constructor(){
        super();
        this.LoadBestellingen = this.LoadBestellingen.bind(this);
        this.GiveBestellingenToState = this.GiveBestellingenToState.bind(this);
        this.state = {games:[], isThereAnOrder: false}
    }
    componentWillMount(){
        this.LoadBestellingen();      
    }
    //Loads the games from the local storage 
    LoadBestellingen(){
        var gamesFromLocalStorage = JSON.parse(String(localStorage.getItem(localStorageType.bestellingen)));
        if(gamesFromLocalStorage.list === null){
            localStorage.setItem(localStorageType.bestellingen, JSON.stringify( {list: []} ));
        }
        else if(gamesFromLocalStorage == null){
            throw new Error("no local storage can be found for bestellingen!")
        }else{
            this.GiveBestellingenToState(gamesFromLocalStorage);
        }
    }
    //The games from local storage get added to the state
    GiveBestellingenToState(localStorageGames: any) : any{
            this.setState({games: localStorageGames.list, isThereAnOrder: true})                   
    }
    render() {
        if(this.state.isThereAnOrder){
            return <div className={"Orders"}>      
            <h1>Bestellingen</h1>
            {this.state.games.map(game => (
                <div className={"Order"}>
              <div>
               <li> <img src={game.image}  height={300}/> </li>
               <div> <h2> Naam: {game.name} </h2> </div>
               <div> <h2> Prijs: {"€" + game.price.toFixed(2)} </h2> </div>
               <div> <h2> Console: {game.console} </h2> </div>
               <div> <h2> Besteld op: {game.orderdate} </h2></div>
               <div> <h2> Status: {game.orderStatus} </h2></div>
               </div>
               </div>
            ))}           
        </div>; 
        }
        else{
            return (
                <div className={"NoOrder"}>
                <div> <h2> No order available </h2> </div>
                </div>
            )
        }
    }
}
