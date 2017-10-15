import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {shoppingCartdata} from "../../DatabaseSimulation/FakeDatabase";
import {game,storage, product}  from '../../DatabaseSimulation/TableTypes';
import {shoppingCart}  from '../../DatabaseSimulation/TableTypes';
import {List} from "linqts";
import {AbstractStorage,StorageState} from "../ReusableComponents/Storage";
import {WensLijstComponent} from "./WensLijstComponent";


export class WenslijstContainer extends AbstractStorage {
    constructor(){
        super();
        this.state = {foundStorageProduct: new List<product>(), storageProducts: new List<storage>(), customerID:1, isShoppingCart:false, loaded:false}
    }
    render() {
        return (
        <div>
            {this.state.foundStorageProduct.ToArray().map((storageProduct,index) =>
            <WensLijstComponent key={index} wishlistProduct={storageProduct} RemoveItemFromStorage={this.RemoveItemFromStorage}/>
            )         
        }</div>
        )}
}
