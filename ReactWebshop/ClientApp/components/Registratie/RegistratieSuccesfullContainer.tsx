import * as React from 'react';
import {List} from "linqts";
import {account} from "../DatabaseSimulation/TableTypes";
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router';

//If the registration went succesfull, then this component will be loaded 

export class RegistratieSuccesfullContainer extends React.Component<RouteComponentProps<{}>, {}> {
    constructor(){
        super();
    }
    render(){
        return(
            <div className={"RegistratieSuccesfullContainer"}>
            <div> <h1> Registratie is gelukt! Login met de gekozen gebruikersnaam en wachtwoord! </h1> </div>          
            </div>
        )}
}
export default RegistratieSuccesfullContainer;