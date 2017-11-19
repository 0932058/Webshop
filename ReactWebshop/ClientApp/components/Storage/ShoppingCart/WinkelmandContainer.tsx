import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import {shoppingCartdata} from "../../DatabaseSimulation/FakeDatabase";
import {game,storage, product}  from '../../DatabaseSimulation/TableTypes';
import {shoppingCart}  from '../../DatabaseSimulation/TableTypes';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../ReusableComponents/Storage";
import {WinkelMandComponent} from "./WinkelmandComponent";
import {User} from "../../User/User";

//Container for the winkelmand

export class Winkelmand extends AbstractStorage {
    constructor(){
        super();    
        //Gets the pk of the logged in user
        var loggedInUserPK = User.IsUserLoggedIn? User.GetPK() : 0
        this.state = {storageProducts: null, convertedStorageProducts: null,customerID: loggedInUserPK, isShoppingCart:true, loaded:false, totalPrice: 0}
    }
    render() {
        return (
            
        <div className={"Container"}>
            <h1>Winkelmand</h1>
            {this.state.convertedStorageProducts.map((storageProduct,index) =>
            <WinkelMandComponent key={index} shoppingCartProduct={storageProduct} RemoveItemFromStorage={this.RemoveItemFromStorage}/>)  
            }
            <p> Total items: {this.state.convertedStorageProducts.length}</p>
            <p> Total Price: €{this.state.totalPrice.toFixed(2)}</p>
            <h2> <NavLink to={ '/Afrekenen' } exact activeClassName='active' className='AfrekenLink'> Naar Afrekenen </NavLink> </h2>
            </div>          
        )}
}

{
    //Old comments
    
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