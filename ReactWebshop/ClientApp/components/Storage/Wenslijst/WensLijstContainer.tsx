import * as React from 'react';
import { RouteComponentProps } from "react-router";
import Img from "react-image";
import {List} from "linqts";
import {User} from "../../User/User";
import { Link, NavLink } from 'react-router-dom';
import {AbstractStorage,StorageState} from "../ReusableComponents/Storage";
import { Product, Wenslijst } from "ClientApp/components/Items/ItemsInterfaces";

export class WenslijstContainer extends AbstractStorage {
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
            formStraatnummer:"",
            formPostcode: "",
            formEmail: "",
            productdata: [],
            nieuweKlant: null,
        }

    }
    GetWishlist(){
        console.log(this.state.customerID)
        fetch('api/Wenslijsten/Get/' + this.state.customerID)
        .then(response => response.json() as Promise<Wenslijst[]>)
        .then(data =>{
           console.log("GetWishlist geeft " + data[0]);
           this.setState({products: data})
        });
        
    }
    FetchProductData(){
        this.state.products.forEach(order => {
            fetch('api/Items/Item/' + order.productNmr)
            .then(response => response.json() as Promise<Product[]>)
            .then(data => {
                var datastorage = [];
                datastorage = this.state.productdata;
                var dataset = { "Naam" : data[0].productNaam, "Prijs":data[0].productPrijs, "Console" :data[0].consoleType, "Genre" :data[0].productGenre, "Image" : data[0].productImg, "Id" : order.productNmr};
                datastorage.push(dataset);
                this.setState({productdata: datastorage, loaded: true});
            });
        })
        
    }
    GetProductDataFromState(id){
        if (this.state.loaded != true){
        this.FetchProductData();
        }
        var datastorage = [];
        function idmatch(item){
            return item.Id == id;
        }
        datastorage = this.state.productdata;
        var res = datastorage.find(idmatch);
        return res;
    }
    CheckLogin(){
        if (this.state.customerID == 0)
        {
            return false;
        }
        else{
            return true;
        }
    }
    async DeleteItem(item){
        let apiUrl = 'api/Wenslijsten/Delete';
        let apiResponse = await fetch(apiUrl, {method: 'Delete',body: JSON.stringify(item) , headers: new Headers({'content-type' : 'application/json'})});
        console.log("WenslijstItem met id " + item.productNmr + " zou verwijderd moeten zijn")
        this.GetWishlist();
        this.FetchProductData();
    }
    AddProductToShoppingCartLocalStorage(product){
        var itemlist = [];
        itemlist = JSON.parse(localStorage.getItem("Winkelmand"));
        if (itemlist != null){
            var item = {"name" : product.Naam, "id" : product.productNmr, "price": product.Prijs, "index" : itemlist.length, "console": product.Console, "image": product.Image};
            itemlist.push(item)
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
            
        }
        else{
            var item = {"name" : product.Naam, "id" : product.productNmr, "price": product.Prijs, "index" : 0, "console": product.Console, "image": product.Image};
            itemlist = [item]
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
        }
    }
    GetTotalPrice(){
        var res = 0;
        this.state.products.forEach(product =>{
            var data = this.GetProductDataFromState(product.productNmr);
            res += data.Prijs;
        })
        return res;
    }
    componentDidMount(){
        this.GetWishlist();
        this.GetTotalPrice();
    }
    render() {
        return (
            
        <div className={"Container"}>
            <div className='container'>
                <div className='col-md-9'>
                <h1>Uw wenslijst</h1>
                <div className='col-md-3'>
                <h4> Aantal producten: {this.state.products.length}</h4>
                <h4> Totaal prijs: €{this.GetTotalPrice().toFixed(2)}</h4>
                </div>
            </div>
            </div>
            <div>
                    { this.state.products.length == 0?
                    <div>
                        <h4>Uw wenslijst is leeg.</h4>
                        <NavLink to={"/"}>
                            <button className="btn btn-primary">Verder winkelen</button>
                        </NavLink>
                    </div>
                    :
                    null}
                <div>
                {this.state.products.map(
                    listitem =>{
                        var data = this.GetProductDataFromState(listitem.productNmr);
                        return(
                            <div className={"Component"}>
                                <div className='container-fluid'>
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                                <div className='col-md-2'>
                                                    <img className="img-responsive" src={data.Image}/>
                                            </div>
                                            <div className='col-md-2'>
                                                <p><b>{data.Naam}</b></p>
                                                <p>Naam: {data.Naam}</p>
                                                <p>Genre: {data.Genre}</p>
                                                <p>Console: {data.Console}</p>
                                                <p>Prijs: €{data.Prijs}</p>
                                            </div>
                                            <div className="col-md-4">
                                                <NavLink to={ '/Item/' + listitem.productNmr } exact activeClassName='Active'className='button_to_product'>
                                                    <button className={"btn btn-primary"} > naar product </button>
                                                </NavLink>
                                                <p></p>
                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModalM" onClick={() => this.AddProductToShoppingCartLocalStorage(data)}>Toevoegen aan winkelmand</button>
                                                <div className="modal fade" id="myModalM" role="dialog">
                                                    <div className="modal-dialog modal-sm">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                        <h4 className="modal-title">Product is toegevoegd!</h4>
                                                        </div>
                                                        <div className="modal-body">
                                                        <p>het door u gekozen item is succesvol toegevoegd aan de winkelmand</p>
                                                        <button type="button" className="btn btn-default" data-dismiss="modal" data-backdrop="false">verder winkelen</button>
                                                        <a href='/Winkelmand'><button type="button" className="btn btn-default" data-backdrop="false" >naar winkelmand</button></a>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                                <p></p>
                                                <button type="button" className="btn btn-primary" onClick={() => this.DeleteItem(listitem)}>Verwijderen</button>

                                            </div>
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
        </div>
        );
    }
}           
export default WenslijstContainer;