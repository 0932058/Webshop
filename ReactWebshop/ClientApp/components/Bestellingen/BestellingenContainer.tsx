import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image';
import {List} from "linqts";
import {User} from "../User/User";
import {AbstractStorage,StorageState} from "../Storage/ReusableComponents/Storage";
import { Product, Bestelling, JoinedBestelling } from 'ClientApp/components/Items/ItemsInterfaces';
import {ProfileSideMenuLinks} from "../Profile/Layout/ProfileSideMenuLinks";

export class BestellingenContainer extends AbstractStorage {
    constructor(){
        super();
        //If the user is logged in, it gets the PK of the logged in user and adds it to the state;
        this.state = {
            customerID: User.getStorageId(), 
            isShoppingCart:false, 
            loaded:false, 
            products: [], 
            totalPrice: 0, 
            ordered: true,
            formVoornaam: "",
            formAchternaam: "",
            formStraatnaam: "",
            formStraatnummer: "",
            formPostcode: "",
            formEmail: "",
            productdata: [],
            nieuweKlant: null,
        }
    }

    componentDidMount(){
        this.GetOrders();
    }

    async GetOrders(){
        if (this.state.customerID == 0)
        {
            return false;
        }
        else{
            console.log(this.state.customerID)
            await fetch('api/Bestellingen/Get/' + this.state.customerID)
            .then(response => response.json() as Promise<JoinedBestelling[]>)
            .then(data =>{
               console.log("GetOrders geeft " + data[0]);
               this.setState({products: data})
            });
            this.BuildSets();
        }
        }
        BuildSets(){
            var orders = this.state.products;
            var tempset = [];
            var res = [];
            orders.forEach(order =>
                {
                    if(tempset.find(value => value === order.groupId) !== order.groupId){
                        res[order.groupId] = []
                        tempset.push(order.groupId)
                    }
                }
            )

            orders.forEach(order => {
                res[order.groupId].push(order)
            });
            console.log(res);
            this.setState({productdata: res, loaded: true});
        }
    // async UpdateBestelling(order, statusstring){
    //     let apiUrl = 'api/Bestellingen';
    //     let OrderToPost: Bestelling = {
    //         BestellingId: order.BestellingId,
    //         productId: order.productId,
    //         bestellingDatum: order.bestellingDatum,
    //         verstuurDatum: new Date(),
    //         status: statusstring,
    //         klantId: order.klantId.klantId
    //     }
    //     let apiResponse = await fetch(apiUrl, {method: "PUT", body:JSON.stringify(OrderToPost), headers: new Headers({'content-type' : 'application/json'})});
    //     alert("Voltooid");
        
    // }
    
    async UpdateBestelling2(orderPK: number){
        let apiResponse = await fetch('api/Bestellingen/Update2/' + orderPK, {method: 'POST', headers: new Headers({'content-type' : 'application/json'})});
        this.GetOrders(); 
        alert("Voltooid")
    }

    render() {
        return (
            
        <div className={"Container"}>
            <div className='container'>
                <div className='col-md-2'>
                <ProfileSideMenuLinks/>
                </div>
            </div>
            
            <div className='container'>
                <div className='col-md-2'>
                <h1>Bestellingen</h1>
                </div>
            </div>
            <div>
                {this.state.loaded ?
                this.state.productdata.reverse().map(
                set =>{
                    console.log(set.length)
                    if (set.length != 0){

                    return(
                        <div>
                            <h1>BestellingId: {set[0].groupId}</h1>
                            {
                            set.reverse().map(
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
                                                    {
                                                        order.status == "Verzonden"?
                                                        <button onClick={() => this.UpdateBestelling2(order.bestellingId)}> Markeer als ontvangen </button>
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
                            }
                        </div>
                        )
                    }
                    }
        )
        :
        null
    }
    </div>
    </div>
        )
}
}           
export default BestellingenContainer;