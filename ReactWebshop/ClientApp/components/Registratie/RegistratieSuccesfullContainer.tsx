import * as React from 'react';
import {List} from "linqts";
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
            <h1> Registratie is gelukt!</h1>
            <h2>Login met de gekozen gebruikersnaam en wachtwoord!</h2>     
            </div>
        )}
}
export default RegistratieSuccesfullContainer;