import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {shoppingCartdata} from "../../DatabaseSimulation/FakeDatabase";
import {game,storage, product}  from '../../DatabaseSimulation/TableTypes';
import {shoppingCart}  from '../../DatabaseSimulation/TableTypes';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../ReusableComponents/Storage";
import {WensLijstComponent} from "./WensLijstComponent";
import {User} from "../../User/User";

export class WensLijstContainer extends AbstractStorage {
    constructor(){
        super();    
        var loggedInUserPK = User.IsUserLoggedIn? User.GetPK() : 0
        this.state = {storageProducts: null, convertedStorageProducts: null,customerID: loggedInUserPK, isShoppingCart:false, loaded:false, totalPrice: 0}
    }
    render() {
        return (
        <div className={"Container"}>
            <h1>Wenslijst</h1>
            {this.state.convertedStorageProducts.map((storageProduct,index) =>
            <WensLijstComponent key={index} WenslijstProduct={storageProduct} RemoveItemFromStorage={this.RemoveItemFromStorage}/>)  
            }
            <h1> Total items: {this.state.convertedStorageProducts.length}</h1>
            <h1> Total Price: €{this.state.totalPrice.toFixed(2)}</h1>
            <h1> <button> Finalize order </button> </h1>
            </div>          
        )}
}
export default WensLijstContainer;