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
    amount: number;
    page: number;
    search: string;
}

export class BestellingenPage extends React.Component<{}, BestellingenState> {
    constructor(){
        super();
        this.onSearchChange = this.onSearchChange.bind(this)
        this.resetSearch = this.resetSearch.bind(this)
        this.BuildSets = this.BuildSets.bind(this);
        this.GetOrders = this.GetOrders.bind(this);

        this.state = {bestellingen: [], loaded: false, bestellingsets: [], amount: 1, page: 5, search: ""}

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
        this.setState({
            bestellingsets: this.BuildSets(this.state.bestellingen), 
            loaded: true
        })
        
    }
    BuildSets(ordersToBuild){
        var orders = ordersToBuild;
        var tempset = [];
        var res = [];
        orders.forEach(order =>
            {
                if(tempset.find(value => value === order.groupId) !== order.groupId && order.groupId > 0){
                    res[order.groupId] = []
                    tempset.push(order.groupId)
                }
            }
        )

        orders.forEach(order => {
            if(order.groupId > 0){
                res[order.groupId].push(order)
            }
            
        });
        return res;
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

    resetSearch(){
        this.BuildSets(this.state.bestellingen)
        this.setState({
            search : "",
        })
    }

    onSearchChange(event){
        let newOrders = [];
        console.log(event.target.value)

        for(let b of this.state.bestellingen){
            if(
                b.bestellingDatum.toString().toLowerCase().includes(event.target.value) ||
                b.status.toLowerCase().includes(event.target.value)                     ||
                b.verstuurDatum.toString().toLowerCase().includes(event.target.value)   
            ){
                newOrders.push(b);
            }
        }

        this.setState({
            bestellingsets: this.BuildSets(newOrders), 
            loaded: true,
            search: event.target.value
        })
    }

    render(){
        return(
            <div className='col-md-8'>
            <div>
                <button className={"btn btn-danger"} onClick={this.resetSearch}>verwijder zoekterm</button>
               <input  type="search" name="search" onChange={this.onSearchChange} placeholder={"zoek naar comments"} value={this.state.search} className="form-control" id="search"></input>
                {this.state.loaded ?
                <div>
                {this.state.bestellingsets.map(
                    (set, index) =>{
                        if (set.length != 0){
                            if( (this.state.page) >= index.valueOf() && ( (this.state.page) - 5) <= index.valueOf() ) {return(
                            <div className="panel panel-default">
                                <div data-toggle="collapse" href={"#collapse" + index} className="panel-heading">
                                    <h2>Bestellingset: {set[0].groupId}</h2>
                                    <h2>Besteldatum: {set[0].bestellingDatum}</h2>
                                    {
                                    set[0].klantId != null?
                                    <h2>Klant: {set[0].klantId.username}</h2>
                                    
                                    :
                                    <p></p>
                                    
                                    }
                                </div>
                                <div id={"collapse" + index} className="panel-collapse collapse" >
                            {
                                set.map(
                                order =>{
                                return(
                                <div className="Component" >
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
                                                    <button className={"btn btn-success"} onClick={() => this.UpdateBestelling2(order.bestellingId)}> Markeer als verzonden </button>
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
                    </div>
                        

                )
                }
                }
                }
                )
                }
                <div className='col-md-10'> 
                        <ul className="pagination">
                        {this.state.page > 5? 
                        <li > <button className={"btn btn-default"} onClick={()=> {this.setState({ page : this.state.page - 5 }); window.scrollTo(0,0)} } >{"<-"} vorige</button> </li>
                        :
                        null
                        }
                         

                            {
                                this.state.bestellingsets.map(
                                    (item, index) => {
                                        if( index % 5 == 0 && index < (this.state.page + 100) && index > (this.state.page - 100) && index != 0){
                                            return (
                                                <li ><button className={"btn btn-primary"} onClick={() => {this.setState({ page : index}); window.scrollTo(0, 0) }}> {index / 5} </button></li>
                                            )
                                        }else{
                                            if((index + 1) === this.state.bestellingsets.length){
                                                
                                                    <li ><button className={"btn btn-primary"} onClick={() => {this.setState({ page : index}); window.scrollTo(0, 0) } }> laatste pagina </button></li>
                                                
                                            }
                                        }
                                    }
                                )
                            }
                            {
                                this.state.bestellingen.length - 5 > this.state.page?
                                <li > <button className={"btn btn-default"} onClick={()=> {this.setState({ page : this.state.page + 5 }); window.scrollTo(0, 0)} }>volgende -></button> </li>
                                :
                                null
                            }   
                        </ul>
                    </div>

                </div>
                

                :
                <p>Bestellingen worden geladen...</p>
                }
                
         </div>
        </div>)}

}
