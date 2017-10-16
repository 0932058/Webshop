import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {game, console,product, category} from "../DatabaseSimulation/TableTypes";
import {gameTableData} from "../DatabaseSimulation/FakeDatabase";
import {consoleType} from "../DatabaseSimulation/ConsoleTable";

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
    HandleStorageAddClick(event: any, isShoppingcart: boolean){
        this.props.AddProductToStorage(isShoppingcart);
    }
    //The objects have to be parsed to json because this.state doesn't allow an single object in the state
    render() {
        return <div  className={"Product"}>      
                <h1>{JSON.parse(this.state.product).name} - {JSON.parse(this.state.product).console}</h1>
                <div>   
                  <li> <img src={this.props.consoleImage}  width={300} height={50} /> </li>          
                   <li> <img src={JSON.parse(this.state.product).image}  height={500}/> </li>                                     
                   <div> <h2> Description: {JSON.parse(this.state.product).description} </h2></div>
                   <div> <h2> Price: €{JSON.parse(this.state.product).price.toFixed(2)} </h2></div>
                
                   {JSON.parse(this.state.product).category == category.games?
                   <div>
                   <div> <h2> Age: {JSON.parse(this.state.product).age} </h2></div>
                   <div> <h2> Genre: {JSON.parse(this.state.product).genreCategory} </h2></div>
                   <div> <h2> Category: {JSON.parse(this.state.product).category} </h2></div>  
                   <div> <h2> Console: {JSON.parse(this.state.product).console} </h2></div>     
                   </div>
                   :         
                   <div>
                   <div> <h2> Memory: {JSON.parse(this.state.product).memory} </h2></div>  
                   <div> <h2> Console: {JSON.parse(this.state.product).console} </h2></div>     
                   </div>    
                   }
                </div>
                <h2>
                <button  onClick= { (e:any) => this.HandleStorageAddClick(e, false)}> Add to wishlist</button>
                <button  onClick= { (e:any) => this.HandleStorageAddClick(e, true)}> Add to shopping cart</button>
                </h2> 
            </div>
            
                
    }
}
export default ProductPageComponent 