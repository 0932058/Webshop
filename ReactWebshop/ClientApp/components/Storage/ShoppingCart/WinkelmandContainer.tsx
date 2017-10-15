import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {shoppingCartdata} from "../../DatabaseSimulation/FakeDatabase";
import {game,storage, product}  from '../../DatabaseSimulation/TableTypes';
import {shoppingCart}  from '../../DatabaseSimulation/TableTypes';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../ReusableComponents/Storage";
import {WinkelMandComponent} from "./WinkelmandComponent";


export class Winkelmand extends AbstractStorage {
    constructor(){
        super();
        this.state = {foundStorageProduct: new List<product>(), storageProducts: new List<storage>(), customerID:1, isShoppingCart:true, loaded:false}
        console.log(shoppingCartdata.Count());
        shoppingCartdata.ForEach(function(wut){
            console.log(wut)
        }
        )}

    render() {
        return (
        <div>
            {this.state.foundStorageProduct.ToArray().map((storageProduct,index) =>
            <WinkelMandComponent shoppingCartProduct={storageProduct} RemoveItemFromStorage={this.RemoveItemFromStorage}/>
            )
            
        }</div>

        )}
}

{/* //JSON related files

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
// */}