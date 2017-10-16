import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {wishListData, shoppingCartdata, consoleTableData, gameTableData} from "../../DatabaseSimulation/FakeDatabase";
import {game,storage, product, category}  from '../../DatabaseSimulation/TableTypes';
import {shoppingCart}  from '../../DatabaseSimulation/TableTypes';
import {List} from "linqts";
//import {AbstractStorage,StorageState} from "../ReusableComponents/Storage";

interface DummyState{

}

export class WenslijstContainer extends React.Component<RouteComponentProps<{}>, DummyState> {
    constructor(){
        super();
    }
}
export default WenslijstContainer;