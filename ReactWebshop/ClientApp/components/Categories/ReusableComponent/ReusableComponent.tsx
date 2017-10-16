import {storage,category, product} from "../../DatabaseSimulation/TableTypes";
import {wishListData, shoppingCartdata, consoleTableData, gameTableData} from "../../DatabaseSimulation/FakeDatabase";
import { RouteComponentProps } from 'react-router';
import * as React from 'react';
import {List} from "linqts";

//AbstractCategory can be used by all Categories

export interface StorageState{
    itemsToShow: List<product>; //The found storage (wishlist or shopping cart) that are linked to the customer PK
    convertedStorageProducts: List<product>; //The products related to the wishlist or shopping, found by the Foreign FK
    clickedOnCategory: category;
    loaded: boolean

}
 export abstract class AbstractCategory  extends React.Component<RouteComponentProps<{}>, StorageState> {
    constructor(){
        super();
    }
    componentWillMount(){

    }
    LoadItems(){
        switch(this.state.clickedOnCategory)
    }
}
export default AbstractCategory;