
import { RouteComponentProps } from 'react-router';
import * as React from 'react';
import {List} from "linqts";

//AbstractStorage can be used by the shoppingcart and Wishlist clases

export interface StorageState{
    customerID: number; //logged in customer
    isShoppingCart:boolean; //Depending on the boolean, the shopping cart and wishlist take their own paths in the methods
    loaded: boolean
    totalPrice: number;
    products: any[];
}
 export abstract class AbstractStorage  extends React.Component<RouteComponentProps<{}>, StorageState> {
    constructor(){
        super();
        this.GiveNotifcation = this.GiveNotifcation.bind(this);
        this.LoadShoppingCartFromLocalStorage = this.LoadShoppingCartFromLocalStorage.bind(this);
        this.GetCustomerProducts = this.GetCustomerProducts.bind(this);
        this.LoadProductsFromApi = this.LoadProductsFromApi.bind(this);
    }
    componentWillMount(){
        this.GetCustomerProducts();
    }
    GetCustomerProducts(){
        if(this.state.isShoppingCart){
            this.LoadShoppingCartFromLocalStorage();
        }
    }
    LoadShoppingCartFromLocalStorage(){
        var shoppingCartList = [];
        shoppingCartList = JSON.parse(localStorage.getItem("Winkelmand"));
        for (let index = 0; index < shoppingCartList.length; index++) {
            this.LoadProductsFromApi(shoppingCartList[index])
            .then(itemFromApi => {
                var stateProducts = this.state.products;
                stateProducts.push(itemFromApi);
                this.setState({products: stateProducts})
            })
            .catch(errorMessage => console.log("Api error, what exactly went wrong is unknown"))   
        }
    }
    async LoadProductsFromApi(apiLink:string) : Promise<any>{
        let apiLinkConverted: string = "api" + apiLink;
        console.log(apiLinkConverted)
        let apiResponse = await fetch(apiLink, {method: 'get', credentials: 'include', headers: new Headers({'content-type' : 'application/json'})});
        let apiResponseJson = await apiResponse.json();
        return apiResponseJson;
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
}
export default AbstractStorage;