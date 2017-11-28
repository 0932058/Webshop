import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {User} from "../User/User";

interface ProductPageState{
    product: string; 
}
interface ProductPageProps{
    product: string
    consoleImage: string
    AddProductToStorage(click: boolean) : void
}
export class ProductPageComponent extends React.Component<ProductPageProps, ProductPageState> {
    constructor(props: ProductPageProps){
        super(props);
        this.HandleStorageAddClick = this.HandleStorageAddClick.bind(this);    
        this.state = {product: this.props.product} //The product is a string but gets converted in the render method
    }
    //When shoppingcart or wishlist is clicked, it goes to a method that adds the clicked on product
    HandleStorageAddClick(event: any, isShoppingcart: boolean){
        this.props.AddProductToStorage(isShoppingcart);
    }
    //The objects have to be parsed to json because this.state doesn't allow an single object in the state
    render() {
        return <div  className={"ProductPageComponent"}>      
                <h1>{JSON.parse(this.state.product).name}</h1>
                <div>         
                <img src={JSON.parse(this.state.product).image} />
                <div className="ProductPageComponentInfo">                                   
                <h2> Beschrijving:</h2><p> {JSON.parse(this.state.product).description} </p>
                <h2> Prijs: €{JSON.parse(this.state.product).price.toFixed(2)} </h2>
                {JSON.parse(this.state.product).category == null?
                <div>
                <h2> Leeftijd: {JSON.parse(this.state.product).age} </h2>
                <h2> Genre: {JSON.parse(this.state.product).genreCategory} </h2>
                <h2> Categorie: {JSON.parse(this.state.product).category} </h2>
                <h2> Console:</h2><img src={this.props.consoleImage}  width={300} height={50} /><p>{JSON.parse(this.state.product).console}</p>
                </div>
                :         
                <div>
                <div> <h2> Geheugen: {JSON.parse(this.state.product).memory} </h2></div>  
                <h2> Console:</h2><img src={this.props.consoleImage}  width={300} height={50} /><p>{JSON.parse(this.state.product).console}</p>     
                </div>    
                }
                </div>
                </div>
                <h2>
                <button  onClick= { (e:any) => this.HandleStorageAddClick(e, true)}> Toevoegen aan winkelwagen</button>
                {User.IsUserLoggedIn() ?
                <button  onClick= { (e:any) => this.HandleStorageAddClick(e, false)}> Toevoegen aan wenslijst</button>
                :
                <div> </div>
                }
             
                </h2> 
            </div>                         
    }
}
export default ProductPageComponent 