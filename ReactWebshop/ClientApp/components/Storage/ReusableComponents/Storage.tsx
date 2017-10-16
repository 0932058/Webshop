import {storage,category, product} from "../../DatabaseSimulation/TableTypes";
import {wishListData, shoppingCartdata, consoleTableData, gameTableData} from "../../DatabaseSimulation/FakeDatabase";
import { RouteComponentProps } from 'react-router';
import * as React from 'react';
import {List} from "linqts";

//AbstractStorage can be used by the shoppinngCart and Wishlist clases

export interface StorageState{
    storageProducts: List<storage>;
    convertedStorageProducts: List<product>;
    customerID: number;
    isShoppingCart:boolean;
    loaded: boolean 
}
 export abstract class AbstractStorage  extends React.Component<RouteComponentProps<{}>, StorageState> {
    constructor(){
        super();
        this.GetCustomerStorageProducts = this.GetCustomerStorageProducts.bind(this);   
        this.LoopThroughStorage = this.LoopThroughStorage.bind(this);
        this.RemoveItemFromStorage = this.RemoveItemFromStorage.bind(this);
    }
    componentWillMount(){
        console.log("WILL MOUNT")
        let loadData : () => void = () => 
        this.GetCustomerStorageProducts(this.state.customerID, this.state.isShoppingCart).then(foundorders => this.setState({storageProducts: foundorders}))
        .then(this.LoopThroughStorage)
        loadData();
    }     
    GetCustomerStorageProducts(customerID: number, isShoppingCart: boolean) : Promise<List<storage>>{
        var storage = new List<any>();
        if(isShoppingCart){
             storage = shoppingCartdata.Where(shoppingCart => shoppingCart.accountFK == customerID)
        }
        else{
            storage = wishListData.Where(wishListData => wishListData.accountFK == customerID)
        }
        return Promise.resolve<List<storage>>(storage);
    }
    LoopThroughStorage(){
        var foundGames = this.state.storageProducts.Where(storage => storage.productForeignKeyReference == category.games).Join(gameTableData, storage => storage.productFK, game => game.pk, (storage1,game1) => game1);
        var foundConsoles = this.state.storageProducts.Where(storage => storage.productForeignKeyReference == category.consoles).Join(consoleTableData, storage => storage.productFK, consoleEntity => consoleEntity.pk, (storage1,console1) =>  console1);
        var productsCombined = foundGames.Concat(foundConsoles).ToList() // combines the games and consoles
        this.setState({convertedStorageProducts: productsCombined, loaded: true})
    }
    RemoveItemFromStorage(productToRemove: product ,category: category){
        //Customerpk is this.state

        var updatedListWithRemovedItem = this.state.convertedStorageProducts.RemoveAll(game => game.pk == productToRemove.pk);
        console.log(shoppingCartdata.Count());
        if(this.state.isShoppingCart){
            shoppingCartdata.RemoveAll(shoppingcart => shoppingcart.accountFK == this.state.customerID &&
                shoppingcart.productFK == productToRemove.pk);    
        }
        else{
            wishListData.RemoveAll(  wishListD =>   wishListD.accountFK == this.state.customerID &&
                wishListD.productFK == productToRemove.pk); 
        }
     
        this.setState({convertedStorageProducts:updatedListWithRemovedItem}) //To make the page re-render, to remove the product
    
    }
    abstract render ();

}
export default AbstractStorage;