import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { List } from "linqts";
import { Product, Bestelling, JoinedBestelling} from 'ClientApp/components/Items/ItemsInterfaces';
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
    componentDidMount(){
        this.BestellingenApiCall()
        .then(result => this.setState({bestellingen: result, loaded: true}))
    }
    async BestellingenApiCall(){    
        let apiUrl = 'api/Bestellingen/GetAll';
        let apiResponse = await fetch(apiUrl, {method: 'Get', headers: new Headers({'content-type' : 'application/json'})}); 
        let responseConverted = apiResponse.json();
        return responseConverted;
    }
    async UpdateBestelling(order, statusstring){
        let apiUrl = 'api/Bestellingen';
        let OrderToPost: Bestelling = {
            BestellingId: order.BestellingId,
            productId: order.productId,
            bestellingDatum: order.bestellingDatum,
            verstuurDatum: new Date(),
            status: statusstring,
            klantId: order.klantId.klantId
        }
        let apiResponse = await fetch(apiUrl, {method: "PUT", body:JSON.stringify(OrderToPost), headers: new Headers({'content-type' : 'application/json'})});
        alert("Voltooid");
        
    }
    render(){
        return(
            <div>
                {this.state.loaded ?
                this.state.bestellingen.map(
                    order =>{
                        return(
                            <div className={"Component"}>
                            <div className='container'>
                                <div className="panel panel-default">    
                                <div className='col-md-2'>
                                        <div className="panel-body"><img className="img-responsive" src={order.productId.productImg}/></div>
                                    </div>
                                    <div className='col-md-4'>
                                        <p>Status: {order.status}</p>
                                        <p>Prijs: €{order.productId.productPrijs}</p>
                                        <p>Besteldatum: {order.bestellingDatum}</p>
                                        <p>Verstuurdatum: {order.verstuurDatum}</p>
                                        <p>Klant: {order.klantId.username}</p>
                                        {order.status == 'In behandeling'?
                                        <p><button onClick={() => this.UpdateBestelling(order, 'Verzonden')}> Product Verzenden</button></p>
                                        : 
                                        <p></p>
                                        }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    }

                )
                :
                <p>Bestellingen worden geladen...</p>
                }
         </div>
        )}

}
