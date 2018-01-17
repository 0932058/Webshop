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
            
            <h1> Gegevens </h1>
            <p><b>Voornaam: </b>{User.GetFirstname()} </p>
            <p> <b>Achternaam: </b>{User.GetLastname()} </p>
            <p><b> Email: </b>{User.GetEmail()} </p>
            <p> <b>Username: </b>{User.GetUsername()} </p>
            <p> <b>Straat: </b>{User.GetStreetname()} {User.GetStreetnumber()}</p>
            <p> <b>Postcode: </b>{User.getPostcode()} </p>
                   
        </div>
        </div>
    )
    }     
}
export default GegevensComponent;