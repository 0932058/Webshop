import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image'
import {game, order} from "./Database(Simulation)/TableTypes";
import {gameTableData, orderTabledata} from "./Database(Simulation)/TablesInArray";
import {localStorageType} from "./LocalStorage/localStorageTypes";


interface BestellingenState{
    orders: order[] //The games from the local storage gets saved in the array
    isThereAnOrder: boolean; //If there is no order, than a different text gets loaded
}
export class Bestellingen extends React.Component<RouteComponentProps<{}>, BestellingenState> {
    constructor(){
        super();
        this.LoadBestellingen = this.LoadBestellingen.bind(this);
        this.GiveBestellingenToState = this.GiveBestellingenToState.bind(this);
        this.GiveOrderInformation = this.GiveOrderInformation.bind(this)
        this.RenderElementsToScreen = this.RenderElementsToScreen.bind(this);
        this.state = {orders:[], isThereAnOrder: false}

    }
    componentWillMount(){
        this.LoadBestellingen();      
    }
    //Loads the games from the local storage 
    LoadBestellingen(){
        //var gamesFromLocalStorage = JSON.parse(String(localStorage.getItem(localStorageType.bestellingen)));
        localStorage.setItem(localStorageType.bestellingen, JSON.stringify( {list: [orderTabledata[0]]} )); //To test
        var gamesFromLocalStorage = JSON.parse(String(localStorage.getItem(localStorageType.bestellingen)));
        
        if(gamesFromLocalStorage.list === null){
            localStorage.setItem(localStorageType.bestellingen, JSON.stringify( {list: orderTabledata} )); //To test
        }
        else if(gamesFromLocalStorage == null){
            throw new Error("no local storage can be found for bestellingen!")
        }else{
            this.GiveBestellingenToState(gamesFromLocalStorage);
        }
    }
    //The games from local storage get added to the state
    GiveBestellingenToState(localStorageGames: any) : any{
            this.setState({orders: localStorageGames.list, isThereAnOrder: true})                   
    }
    GiveOrderInformation(order: order) : any{   
            gameTableData.map(game => {
                if(order.productFK == game.pk){     
                    return this.RenderElementsToScreen(order,game)
                }
            }
            )}  
    RenderElementsToScreen(order: order, game: game){
        return (
            <div>
            <li>  <img src={game.image}  height={700}/> </li>
            <div> <h2> Naam: {game.name} </h2> </div>
            <div> <h2> Prijs: {"€" + game.price.toFixed(2)} </h2> </div>
            <div> <h2> Besteld op: {order.orderdate} </h2></div>
            <div> <h2> Status: {order.statusOfOrder} </h2></div>
            </div>       
        )
    }
    render() {
        if(this.state.isThereAnOrder){
            return <div className={"Orders"}>      
            <h1>Bestellingen</h1>
                {this.state.orders.map(order => (
                 <div className={"Order"}>
                 {this.GiveOrderInformation(order)} 
        </div> 
                ))}
        </div>
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
