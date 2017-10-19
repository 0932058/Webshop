import * as React from 'react';
import {accountsTableData} from "../../DatabaseSimulation/FakeDatabase";
import {account} from "../../DatabaseSimulation/TableTypes";
import {List} from "linqts";
import { RouteComponentProps } from 'react-router';
import {RegistratieContainer} from "../../Registratie/RegistratieContainer";
import { Redirect } from 'react-router';
import {User} from "../../User/User";

//Login container

interface GegevensComponentState{
}
interface GegevensComponentProps{
    user:User

}

export class GegevensComponent extends React.Component<GegevensComponentProps, GegevensComponentState> {
    constructor(props: User){
        super();      
    }
    componentWillMount(){
      
    }
    render(){
   
        return(
            <div> 
            <div className={"GegevensComponent"}>
            <h1>
            <h1> Gegevens </h1>
            <div> Voornaam: {this.props.user.GetFirstname()} </div>
            <div> Achternaam: {this.props.user.GetLastname()} </div>
            <div> Email: {this.props.user.GetEmail()} </div>
            <div> Username: {this.props.user.GetUsername()} </div>
            <div> Wachtwoord: {this.props.user.GetPassword()} </div>      
            </h1>
        </div>
        </div>
    )
    }     
}
export default GegevensComponent;