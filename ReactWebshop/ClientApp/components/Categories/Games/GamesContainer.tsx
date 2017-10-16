import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {game, wishList,shoppingCart, console, product, category, storage, storageCategory} from "../../DatabaseSimulation/TableTypes";
import {gameTableData, wishListData, shoppingCartdata, consoleTableData} from "../../DatabaseSimulation/FakeDatabase";
import {consoleType} from "../../DatabaseSimulation/ConsoleTable";
import {GamesComponent} from "./GamesComponent";
import {List} from "linqts";

//The product page

interface ProductPageState{
    product: string; //the product to show is an JSON object because this.state doesn't allow a single object
    consoleImage: string; //The consoleimge that will be shown on the header
    loaded: boolean;
}
export class GamesContainer extends React.Component<RouteComponentProps<{}>, ProductPageState>{
    constructor(){
        super();
   
    }
    componentWillMount(){

    }

    }
    render() {   
        return ( 
            <div>
                {this.state.loaded ? 
                <ProductPageComponent  product={this.state.product} consoleImage={this.state.consoleImage}
                AddProductToStorage={this.StorageAddHandler}/>    
                :
                <div> Loading... </div>
                }
            </div>
        );
    }
}           
export default GamesContainer;