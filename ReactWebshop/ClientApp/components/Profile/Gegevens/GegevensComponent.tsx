import * as React from 'react';
import {accountsTableData} from "../../DatabaseSimulation/FakeDatabase";
import {account} from "../../DatabaseSimulation/TableTypes";
import {List} from "linqts";
import { RouteComponentProps } from 'react-router';
import {RegistratieContainer} from "../../Registratie/RegistratieContainer";
import { Redirect } from 'react-router';
import {User} from "../../User/User";

//Gegevens Component

export class GegevensComponent extends React.Component<{}, {}> {
    constructor(props: User){
        super();      
    }

    render(){  
        return(
            <div> 
            <div className={"GegevensComponent"}>
            <h1>
            <h1> Gegevens </h1>
            <div> Voornaam: {User.GetFirstname()} </div>
            <div> Achternaam: {User.GetLastname()} </div>
            <div> Email: {User.GetEmail()} </div>
            <div> Username: {User.GetUsername()} </div>
            <div> Wachtwoord: {User.GetPassword()} </div>      
            </h1>
          
        </div>
        </div>
    )
    }     
}
export default GegevensComponent;