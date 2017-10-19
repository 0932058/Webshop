import * as React from 'react';
import {List} from "linqts";
import {account} from "../DatabaseSimulation/TableTypes";
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router';

//RegistratieSuccesfullContainer container
export class RegistratieSuccesfullContainer extends React.Component<RouteComponentProps<{}>, {}> {
    constructor(){
        super();
    }
    render(){
        return(
            <div className={"RegistratieSuccesfullContainer"}>
            <div> <h1> Registratie is succesfull! Login met de username en password! </h1> </div>
            
            </div>
        )}
}
export default RegistratieSuccesfullContainer;