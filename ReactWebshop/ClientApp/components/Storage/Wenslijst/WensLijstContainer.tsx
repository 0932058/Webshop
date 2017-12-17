import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image';
import {List} from "linqts";
import {User} from "../../User/User";
import {AbstractStorage,StorageState} from "../ReusableComponents/Storage";
import { Product, Bestelling } from 'ClientApp/components/Items/ItemsInterfaces';

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
            formPostcode: "",
            formEmail: "",
            productdata: []}
    }
    GetWishlist(){
        console.log(this.state.customerID)
        fetch('api/Get/' + this.state.customerID)
        .then(response => response.json() as Promise<Bestelling[]>)
        .then(data =>{
           console.log("GetOrders geeft " + data[0]);
           this.setState({products: data})
        });
        
    }
    FetchProductData(){
        this.state.products.forEach(order => {
            fetch('api/Items/Item/' + order.productId)
            .then(response => response.json() as Promise<Product[]>)
            .then(data => {
                var datastorage = [];
                datastorage = this.state.productdata;
                var dataset = { "Naam" : data[0].productNaam, "Image" : data[0].productImg, "Id" : order.productId};
                datastorage.push(dataset);
                this.setState({productdata: datastorage, loaded: true});
            });
        })
        
    }
    GetProductDataFromState(id){
        this.FetchProductData();
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
    componentDidMount(){
        this.GetWishlist();
    }
    render() {
        return (
            
        <div className={"Container"}>
            <div className='container'>
                <div className='col-md-9'>
                <h1>Bestellingen</h1>
            </div>
            </div>
                <div>
                {this.state.products.map(
                    listitem =>{
                        var data = this.GetProductDataFromState(listitem.productId);
                        return(
                            <div className={"Component"}>
                            <div className='container'>
                                <div className="panel panel-default">    
                                <div className='col-md-2'>
                                        <div className="panel-body"><img className="img-responsive" src={data.Image}/></div>
                                    </div>
                                    <div className='col-md-4'>
                                        <p>{data.Naam}</p>
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
        );
    }
}           
export default WenslijstContainer;