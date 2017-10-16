import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {game, console,product, category} from "../DatabaseSimulation/TableTypes";
import {gameTableData} from "../DatabaseSimulation/FakeDatabase";
import {consoleType} from "../DatabaseSimulation/ConsoleTable";

interface ProductPageState{
    product: product;
 
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
        var parsedProduct = JSON.parse(this.props.product)
        this.state = {product: parsedProduct}

    }
    HandleStorageAddClick(event: any, isShoppingcart: boolean){
        this.props.AddProductToStorage(isShoppingcart);
    }
    render() {
        return <div  className={"Product"}>      
                <h1>{this.state.product.name} - {this.state.product.console}</h1>
                <div>   
                  <li> <img src={this.props.consoleImage}  width={300} height={50} /> </li>          
                   <li> <img src={this.state.product.image}  height={500}/> </li>                                     
                   <div> <h2> Description: {this.state.product.description} </h2></div>
                   <div> <h2> Price: €{this.state.product.price.toFixed(2)} </h2></div>

                   {/* {this.state.product.categoryKind == category.games? 
                   <div>
                   <div> <h2> Age: {this.state.product.age} </h2></div>
                   <div> <h2> Genre: {this.state.product} </h2></div>
                   <div> <h2> Category: {this.state.product.category} </h2></div>  
                   <div> <h2> Console: {this.state.product.console} </h2></div>     
                   </div>
                   :         
                   <div>
                   <div> <h2> Memory: {this.state.product} </h2></div>  
                   <div> <h2> Console: {this.state.product.console} </h2></div>     
                   </div>    
                   } */}
                </div>
                <h2>
                <button  onClick= { (e:any) => this.HandleStorageAddClick(e, false)}> Add to wishlist</button>
                <button  onClick= { (e:any) => this.HandleStorageAddClick(e, true)}> Add to shopping cart</button>
                </h2> 
            </div>
            
                
    }
}
export default ProductPageComponent 