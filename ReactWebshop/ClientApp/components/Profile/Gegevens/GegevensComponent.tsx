import * as React from 'react';
import {List} from "linqts";
import { RouteComponentProps } from 'react-router';
import {RegistratieContainer} from "../../Registratie/RegistratieContainer";
import { Redirect } from 'react-router';
import {User} from "../../User/User";

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
            <h2> Voornaam: {User.GetFirstname()} </h2>
            <h2> Achternaam: {User.GetLastname()} </h2>
            <h2> Email: {User.GetEmail()} </h2>
            <h2> Username: {User.GetUsername()} </h2>
            <h2> Straat: {User.GetStreetname()} </h2>
            <h2> Postcode: {User.getPostcode()} </h2>
            </h1>       
        </div>
        </div>
    )
    }     
}
export default GegevensComponent;