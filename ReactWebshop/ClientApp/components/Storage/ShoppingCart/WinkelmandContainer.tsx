import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {shoppingCartdata} from "../../DatabaseSimulation/FakeDatabase";
import {game,storage, product}  from '../../DatabaseSimulation/TableTypes';
import {shoppingCart}  from '../../DatabaseSimulation/TableTypes';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../ReusableComponents/Storage";
import {WinkelMandComponent} from "./WinkelmandComponent";

//Container for the winkelmand

export class Winkelmand extends AbstractStorage {
    constructor(){
        super();    
        this.state = {storageProducts: new List<storage>(), convertedStorageProducts: new List<product>(),customerID:1, isShoppingCart:true, loaded:false}
    }
    render() {
        return (
        <div>
            {this.state.convertedStorageProducts.ToArray().map((storageProduct,index) =>
            <WinkelMandComponent key={index} shoppingCartProduct={storageProduct} RemoveItemFromStorage={this.RemoveItemFromStorage}/>
            )         
        }</div>
        )}
}

{
    
    /* //JSON related files

// var games = JSON.parse(String(localStorage.getItem('winkelmand')));
// var gamesList: game[] = games.list;

// localStorage.setItem('winkelmand', JSON.stringify({list: gamesList }));

// this.ConvertJson();
// // }
// ConvertJson() : any{
//     //hier wordt de value van wenslijst naar string gecast om vervolgens naar een JSON object te worden gecast
//     var games = JSON.parse(String(localStorage.getItem('winkelmand')));    
//     if(games != null){
//         this.setState({games: games.list})
//     }
// createStorageAndState(){
//     localStorage.setItem('winkelmand', JSON.stringify({list: []}));
   
// }
// addWinkelmandToBestellingen() {
//     // localStorage.setItem('bestellingen', JSON.stringify({list: []}));
//     // var bestellingen = JSON.parse(String(localStorage.getItem('bestellingen')));
//     // var winkelmand = JSON.parse(String(localStorage.getItem('winkelmand')));

//     // var winkelmandList: BestellingenGame[] = winkelmand.list;
//     // var bestellingenList: BestellingenGame[] = bestellingen.list;
    
//     // winkelmandList.map(item => {
//     //     bestellingenList.push(item);
//     // });

//     // localStorage.setItem('bestellingen', JSON.stringify({list: bestellingenList}));

//     // localStorage.setItem('winkelmand', JSON.stringify({list: []}));
//     // this.ConvertJson();

            //If the user is not logged in then this code below will be activated
        // var wenslijst = JSON.parse(String(localStorage.getItem('winkelmand')));

        // var wenslijstList: game[] = wenslijst.list;
        // if(this.state.game != null){
        //     wenslijstList.push(this.state.game);
        // }
        

        // localStorage.setItem('winkelmand', JSON.stringify({list: wenslijstList}));
// */}