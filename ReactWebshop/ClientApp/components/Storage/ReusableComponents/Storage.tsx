import {storage,category, product} from "../../DatabaseSimulation/TableTypes";
import {wishListData, shoppingCartdata, consoleTableData, gameTableData} from "../../DatabaseSimulation/FakeDatabase";
import { RouteComponentProps } from 'react-router';
import * as React from 'react';
import {List} from "linqts";

//AbstractStorage can be used by the shoppingcart and Wishlist clases

export interface StorageState{
    storageProducts: List<storage>; //The found storage (wishlist or shopping cart) that are linked to the customer PK
    convertedStorageProducts: List<product>; //The products related to the wishlist or shopping, found by the Foreign FK
    customerID: number; //logged in customer
    isShoppingCart:boolean; //Depending on the boolean, the shopping cart and wishlist take their own paths in the methods
    loaded: boolean
    totalPrice: number;
}
 export abstract class AbstractStorage  extends React.Component<RouteComponentProps<{}>, StorageState> {
    constructor(){
        super();
        this.GetCustomerStorageProducts = this.GetCustomerStorageProducts.bind(this);   
        this.LoopThroughStorage = this.LoopThroughStorage.bind(this);
        this.RemoveItemFromStorage = this.RemoveItemFromStorage.bind(this);
        this.RemovingItem = this.RemovingItem.bind(this);
        this.GiveNotifcation = this.GiveNotifcation.bind(this);
        this.UpdatePrice = this.UpdatePrice.bind(this);
   
    }
    //Calls the customer method to get customer storage and thne calls the loop method to see the products related to the customer orders
    componentWillMount(){
        let loadData : () => void = () => 
        this.GetCustomerStorageProducts(this.state.customerID, this.state.isShoppingCart).then(foundorders => this.setState({storageProducts: foundorders}))
        .then(this.LoopThroughStorage)
        
        loadData();
    }    

    //Gets customer storage items
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
    //Gets the products related to the Foreign key of the storage items
    LoopThroughStorage(){
        var foundGames = this.state.storageProducts.Where(storage => storage.productForeignKeyReference == category.games).Join(gameTableData, storage => storage.productFK, game => game.pk, (storage1,game1) => game1);
        var foundConsoles = this.state.storageProducts.Where(storage => storage.productForeignKeyReference == category.consoles).Join(consoleTableData, storage => storage.productFK, consoleEntity => consoleEntity.pk, (storage1,console1) =>  console1);
        var productsCombined = foundGames.Concat(foundConsoles).ToList() // combines the games and consoles
        this.setState({convertedStorageProducts: productsCombined})
        this.UpdatePrice(productsCombined).then(number => this.setState({totalPrice:number, loaded: true}));
    }
    //Gets total price of the prodcuts 
    UpdatePrice(products: List<product>) : Promise<number>{
        var totalPrice: number = 0;
        products.ForEach(function(product){
            totalPrice += product.price;
        })
        return Promise.resolve(totalPrice)
    }
    //removes an item
    RemovingItem(productToRemove: product, category: category, foundItem:any){
        if(foundItem != null){
            var itemToRemove = this.state.isShoppingCart? shoppingCartdata.IndexOf(foundItem): wishListData.IndexOf(foundItem);
            this.state.isShoppingCart? shoppingCartdata.RemoveAt(itemToRemove):wishListData.RemoveAt(itemToRemove)
        }
        var updatedListWithRemovedItem = this.state.convertedStorageProducts.RemoveAll(game => game.pk == productToRemove.pk && game.category == productToRemove.category);
        this.UpdatePrice(updatedListWithRemovedItem).then(totalprice => this.setState({totalPrice:totalprice,convertedStorageProducts: updatedListWithRemovedItem, loaded: true}));
      
        this.GiveNotifcation();    
    }
 
    //When an item gets removed
    GiveNotifcation() {
        var alertText = " item prepared to be removed! Press ok to finalize it"
        if(this.state.isShoppingCart){
            alert("Shopping cart" + alertText);
        }
        else{
            alert("Wishlist item " + alertText);
        }
        
    }
    //When the remove button is clicked, this method gets activated
    //The item to remove gets send to another method: RemovingItem
    RemoveItemFromStorage(productToRemove: product ,category: category){
        this.setState({loaded: false})
        var foundItem;
        if(this.state.isShoppingCart){
            foundItem = shoppingCartdata.Where(SC => SC.accountFK == this.state.customerID
                && SC.productFK == productToRemove.pk && SC.productForeignKeyReference == productToRemove.category).FirstOrDefault();                
        }
        else{
            foundItem = wishListData.Where(SC => SC.accountFK == this.state.customerID
                && SC.productFK == productToRemove.pk && SC.productForeignKeyReference == productToRemove.category).FirstOrDefault();         
        }
        this.RemovingItem(productToRemove,category,foundItem);   
    } 
}
export default AbstractStorage;