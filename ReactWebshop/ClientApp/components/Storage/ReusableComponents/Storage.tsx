import {storage,category, product, shoppingCart,game,console,accessoires} from "../../DatabaseSimulation/TableTypes";
import {wishListData, shoppingCartdata, consoleTableData, gameTableData, accessoiresTableData} from "../../DatabaseSimulation/FakeDatabase";
import { RouteComponentProps } from 'react-router';
import * as React from 'react';
import {List} from "linqts";

//AbstractStorage can be used by the shoppingcart and Wishlist clases

export interface StorageState{
    storageProducts: storage[] //The found storage (wishlist or shopping cart) that are linked to the customer PK
    convertedStorageProducts: product[]; //The products related to the wishlist or shopping, found by the Foreign FK
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
        this.LoadShoppingCartFromApi = this.LoadShoppingCartFromApi.bind(this);
   
    }
    //Calls the customer method to get customer storage and thne calls the loop method to see the products related to the customer orders
    componentWillMount(){
        let loadData : () => void = () => 
        this.GetCustomerStorageProducts().then(foundorders => this.setState({storageProducts: foundorders}))
        .then(this.LoopThroughStorage)      
        loadData();
    }    
    async LoadShoppingCartFromApi() : Promise<shoppingCart[]>{
        let apiUrl: string = 'api/ShoppingCart/Get/'+ this.state.customerID;
        console.log(apiUrl)
        let apiResponse = await fetch(apiUrl, {method: 'get', credentials: 'include', headers: new Headers({'content-type' : 'application/json'})});
        let apiResponseJson = await apiResponse.json();
        return apiResponseJson;

    }

    //Gets customer storage items
    GetCustomerStorageProducts() : Promise<storage[]>{
        var storage;
        if(this.state.isShoppingCart){
            this.LoadShoppingCartFromApi()
            .then(shoppingCart => storage = shoppingCart)
            .catch(errorMessage => console.log(errorMessage))
            //  storage = shoppingCartdata.Where(shoppingCart => shoppingCart.accountFK == this.state.customerID); 
        }
        else{
            storage = wishListData.Where(wishListData => wishListData.accountFK == this.state.customerID)
        }
        return Promise.resolve<storage[]>(storage);
    }
    //Gets the products related to the Foreign key of the storage items
    LoopThroughStorage(){
        var foundGames;
        var foundConsoles: console[];
        var foundAccesoires: accessoires[];

        for (let index = 0; index < this.state.storageProducts.length; index++) {
            if(this.state.storageProducts[index].productForeignKeyReference == "games"){
                //TODO: Api call to games...     
            }
            else if(this.state.storageProducts[index].productForeignKeyReference == "consoles"){
                //TODO: Api call to console...
            }   
            else{
                //TODO: Api call to accessoires...
            } 
        }
        // // // var foundGames = this.state.storageProducts.Where(storage => storage.productForeignKeyReference == category.games).Join(gameTableData, storage => storage.productFK, game => game.pk, (storage1,game1) => game1);
        // // // var foundConsoles = this.state.storageProducts.Where(storage => storage.productForeignKeyReference == category.consoles).Join(consoleTableData, storage => storage.productFK, consoleEntity => consoleEntity.pk, (storage1,console1) =>  console1);
        // // // var foundAccesoires =  this.state.storageProducts.Where(storage => storage.productForeignKeyReference == category.accessoires).Join(accessoiresTableData, storage => storage.productFK, accessoires => accessoires.pk, (storage1,accessoires1) =>  accessoires1);

        // // var gamesAndConsoles = foundGames.Concat(foundConsoles).ToList() // combines the games and consoles
        // // var allProductsCombined = foundAccesoires.Concat(gamesAndConsoles).ToList()
        // this.setState({convertedStorageProducts: allProductsCombined})
        // this.UpdatePrice(allProductsCombined).then(number => this.setState({totalPrice:number, loaded: true}));
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
        // if(foundItem != null){
        //     var itemToRemove = this.state.isShoppingCart? shoppingCartdata.IndexOf(foundItem): wishListData.IndexOf(foundItem);
        //     this.state.isShoppingCart? shoppingCartdata.RemoveAt(itemToRemove):wishListData.RemoveAt(itemToRemove)
        // }
        // var updatedListWithRemovedItem = this.state.convertedStorageProducts.RemoveAll(game => game.pk == productToRemove.pk && game.category == productToRemove.category);
        // this.UpdatePrice(updatedListWithRemovedItem).then(totalprice => this.setState({totalPrice:totalprice,convertedStorageProducts: updatedListWithRemovedItem, loaded: true}));
      
        // this.GiveNotifcation();    
    }
 
    //When an item gets removed
    GiveNotifcation() {
        if(this.state.isShoppingCart){
            alert("Weet u zeker dat u dit product uit de winkelmand wil halen?");
        }
        else{
            alert("Weet u zeker dat u dit product uit uw wenslijst wil halen?");
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