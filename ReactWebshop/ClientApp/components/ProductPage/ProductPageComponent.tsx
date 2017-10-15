import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {game, console,product} from "../DatabaseSimulation/TableTypes";
import {gameTableData} from "../DatabaseSimulation/FakeDatabase";
import {consoleType} from "../DatabaseSimulation/ConsoleTable";

interface ProductPageState{
    product: product
}
interface ProductPageProps{
    product: product
    consoleImage: string
    AddProductToWishlist() : void
    AddProductToWinkelMand() : void
}
export class ProductPageComponent extends React.Component<ProductPageProps, ProductPageState> {
    constructor(props: ProductPageProps){
        super(props);

        this.state = {product: this.props.product}; //Game inserted from array to test the page layout

    }
    render() {
        return <div  className={"ProductPage"}>      
                <h1>{this.state.product.name} - {this.state.product.console}</h1>
                <div>   
                    <div className={"product"}>
                    <li> <img src={this.props.consoleImage}  width={300} height={50} /> </li>          
                   <li> <img src={this.state.product.image}  height={500}/> </li>                                     
                   <div> <h2> Description: {this.state.product.description} </h2></div>
                   <div> <h2> Price: €{this.state.product.price.toFixed(2)} </h2></div>

                   {this.state.product.kind == "game" ?
                   <div>
                   <div> <h2> Age: {this.state.product.age} </h2></div>
                   <div> <h2> Genre: {this.state.product.genreCategory} </h2></div>
                   <div> <h2> Category: {this.state.product.category} </h2></div>  
                   <div> <h2> Console: {this.state.product.console} </h2></div>     
                   </div>
                   :         
                   <div>
                   <div> <h2> Memory: {this.state.product.memory} </h2></div>  
                   <div> <h2> Console: {this.state.product.console} </h2></div>     
                   </div>    
                   }
                </div>
                <h2>
                <button  onClick={this.props.AddProductToWishlist}> Add to wishlist</button>
                <button  onClick={this.props.AddProductToWinkelMand}> Add to shopping cart</button>
                </h2>
            </div>
            </div>;             
    }
}
export default ProductPageComponent 