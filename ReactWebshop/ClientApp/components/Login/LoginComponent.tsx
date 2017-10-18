import * as React from 'react';
import {gameTableData, consoleTableData, accessoiresTableData} from "../DatabaseSimulation/FakeDatabase";
import {product} from "../DatabaseSimulation/TableTypes";
import {List} from "linqts";
import {ProductPage} from "../ProductPage/ProductPageContainer";
import { RouteComponentProps } from 'react-router';

//Login container

interface LoginComponentState{
    
}
export class LoginComponent extends React.Component<RouteComponentProps<{}>, LoginComponentState> {
    constructor(){
        super();
       
    }
    componentWillMount(){
     
    }
    render(){
   
        return(
            <div className={"Home"}>
            
            </div>
        )}
}
export default LoginComponent;