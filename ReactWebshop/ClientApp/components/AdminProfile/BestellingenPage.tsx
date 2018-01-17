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
    bestellingsets : any[]
    loaded: boolean;
}

export class BestellingenPage extends React.Component<{}, BestellingenState> {
    constructor(){
        super();
        this.state = {bestellingen: [], loaded: false, bestellingsets: []}

    }
    componentDidMount(){
        this.GetOrders()
    }
    async GetOrders(){
        await fetch('api/Bestellingen/GetAll')
        .then(response => response.json() as Promise<JoinedBestelling[]>)
        .then(data =>{
           console.log("GetOrders geeft " + data[0]);
           this.setState({bestellingen: data})
        });
        this.BuildSets();
    }
    BuildSets(){
        var orders = this.state.bestellingen;
        var tempset = [];
        var res = [];
        var tempnumber = 1;
        orders.forEach(order => {
            if (order.groupId == tempnumber){
                tempset.push(order);
            }
            else{
                res.push(tempset);
                tempset = [];
                tempset.push(order);
                tempnumber = order.groupId;
            }
            
        });
        console.log(res);
        this.setState({bestellingsets: res, loaded: true});
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
                this.state.bestellingsets.map(
                    set =>{
                        if (set.length != 0){
                        return(
                            <div>
                                <h1>Bestellingset: {set[0].groupId}</h1>
                            {
                                set.map(
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
                                                <p>Bestelling groep: {order.groupId}</p> 
                                                {
                                                order.klantId != null?
                                                <p>Klant: {order.klantId.username}</p>
                                                
                                                :
                                                <p></p>
                                                
                                                }
                                                {
                                                    order.status == "In behandeling"?
                                                    <button onClick={() => this.UpdateBestelling2(order.bestellingId)}> Markeer als verzonden </button>
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
                    }</div>
                        

                )
                }
            }
                )
                :
                <p>Bestellingen worden geladen...</p>
                }
                
         </div>
        )}

}
