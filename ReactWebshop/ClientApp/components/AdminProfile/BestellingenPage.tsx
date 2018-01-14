import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { List } from "linqts";
import { Product, JoinedBestelling} from 'ClientApp/components/Items/ItemsInterfaces';
import {IAdmin} from "./AdminInterface";
import { Link, NavLink } from 'react-router-dom';


// BestellingId : number
// productId : Product
// bestellingDatum : Date 
// verstuurDatum : Date 
// status : string
// klantId : number

interface BestellingenState{
    bestellingen: JoinedBestelling[]
    loaded: boolean;
}

export class BestellingenPage extends React.Component<{}, BestellingenState> {
    constructor(){
        super();
        this.state = {bestellingen: [], loaded: false}

    }
    componentWillMount(){
        this.BestellingenApiCall()
        .then(result => this.setState({bestellingen: result, loaded: true}))
    }
    async BestellingenApiCall(){    
        let apiUrl = 'api/Bestellingen/GetAll';
        let apiResponse = await fetch(apiUrl, {method: 'Get', headers: new Headers({'content-type' : 'application/json'})}); 
        let responseConverted = apiResponse.json();
        return responseConverted;
    }
    render(){
        return(
            <div>
                {this.state.loaded?               
                this.state.bestellingen.map((bestelling => {
                    return([
                    <div key={1}> BestellingsId: {bestelling.BestellingId} </div>,
                    <div> ProductId: {bestelling.productId} </div>,
                    <div> bestellingDatum: {bestelling.bestellingDatum} </div>,
                    <div> verstuurDatum: {bestelling.verstuurDatum} </div>,
                    <div> status: {bestelling.status} </div>,
                    <div> klantId: {bestelling.klantId} </div>
                    ])}))
                :
                <div> Loading orders...</div>
        }
         </div>
        )}

}
