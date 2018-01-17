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
        this.GetOrders()
    }
    async GetOrders(){
        await fetch('api/Bestellingen/GetAll')
        .then(response => response.json() as Promise<JoinedBestelling[]>)
        .then(data =>{
           console.log("GetOrders geeft " + data[0]);
           data = data.reverse();
           this.setState({bestellingen: data, loaded: true})
        });
    }
    // async UpdateBestelling(order, statusstring){
    //     let apiUrl = 'api/Bestellingen/Update';
    //     let OrderToPost: Bestelling = {
    //         BestellingId: order.BestellingId,
    //         productId: order.productId.productId,
    //         bestellingDatum: order.bestellingDatum,
    //         verstuurDatum: new Date(),
    //         status: statusstring,
    //         klantId: order.klantId.klantId
    //     }
    //     let apiResponse = await fetch(apiUrl, {method: 'UPDATE', body:JSON.stringify(OrderToPost), headers: new Headers({'content-type' : 'application/json'})});
    //     this.GetOrders();
    //     alert("Voltooid"); 
    // }
    async UpdateBestelling2(orderPK: number){
        let apiResponse = await fetch('api/Bestellingen/Update2/' + orderPK, {method: 'POST', headers: new Headers({'content-type' : 'application/json'})});
        this.GetOrders(); 
        alert("Voltooid")
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
                                        <p>Bestelling Id: {order.bestellingId}</p>
                                        <p>Bestelling groep: {order.groepId}</p> 
                                        {
                                        order.klantId != null?
                                        <p>Klant: {order.klantId.username}</p>
                                        
                                        :
                                        <p></p>
                                        
                                        }
                                        <button onClick={() => this.UpdateBestelling2(order.bestellingId)}> Markeer als verzonden </button>
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
