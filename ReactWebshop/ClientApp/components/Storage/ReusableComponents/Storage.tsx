import {storage,category, product} from "../../DatabaseSimulation/TableTypes";
import {wishListData, shoppingCartdata, consoleTableData, gameTableData} from "../../DatabaseSimulation/FakeDatabase";
import { RouteComponentProps } from 'react-router';
import * as React from 'react';
import {List} from "linqts";

//AbstractStorage can be used by the shoppinngCart and Wishlist clases

export interface StorageState{
    storageProducts: List<storage>;
    foundStorageProduct: List<product>;
    customerID: number;
    isShoppingCart:boolean;
    loaded: boolean 
}
 export abstract class AbstractStorage  extends React.Component<RouteComponentProps<{}>, StorageState> {
    constructor(){
        super();
        this.GetCustomerStorageProducts = this.GetCustomerStorageProducts.bind(this);    
        this.RemoveItemFromStorage = this.RemoveItemFromStorage.bind(this);
        this.LoopThroughStorage = this.LoopThroughStorage.bind(this);
        console.log(shoppingCartdata.Count());
    
    }
    componentWillMount(){
        let loadData : () => void = () => 
        this.GetCustomerStorageProducts(this.state.customerID, this.state.isShoppingCart).then(foundorders => this.setState({storageProducts: foundorders}))
        this.LoopThroughStorage();
    }     

    GetCustomerStorageProducts(customerID: number, iShoppingCart: boolean) : Promise<List<storage>>{
        var storage;
        if(iShoppingCart){
             storage = shoppingCartdata.Where(shoppingCart => shoppingCart.pk == customerID)
        }
        else{
            storage = wishListData.Where(wishListData => wishListData.pk == customerID)
        }
        return Promise.resolve<List<storage>>(storage);
    }
    LoopThroughStorage(){
     var foundProduct = new List<any>();
     let GetProductThatMatchesOrder: (order:storage, category1: category) => any =
      (order:storage,category1: category) => this.GetProductThatMatchesOrder(order,category1);
        let orders: List<any> = new List<any>(); 
        this.state.storageProducts.ForEach(function(storageProduct){
             var foundStorageProduct = GetProductThatMatchesOrder(storageProduct, storageProduct.productForeignKeyReference)
             foundProduct.Add(foundStorageProduct)
         }
     )
      this.setState({foundStorageProduct: foundProduct})
     }  
    GetProductThatMatchesOrder(storage: storage, productType: category){
        var foundProduct;
        switch(productType){
            case(category.accessoires):
             break;
             case(category.consoles):
             foundProduct = consoleTableData.Where(console => new List(storage.productFK).Contains(console.pk));
             break;
             case(category.games):
             foundProduct = gameTableData.Where(game =>  new List(storage.productFK).Contains(game.pk));
             break;
        }
        //converted to array to get items by index
        var foundProductToArray = foundProduct.ToArray();
        var productWithOrderInfo = {image: foundProductToArray[0].image, name:  foundProductToArray[0].name, price:  foundProductToArray[0].price}
     return productWithOrderInfo;
    }

    RemoveItemFromStorage(event: any){
        //TODO implement this
        
    }
    abstract render ();

}
export default AbstractStorage;