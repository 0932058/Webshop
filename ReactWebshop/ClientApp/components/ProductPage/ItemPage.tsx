import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {User} from "../User/User";
import { ItemsContainer } from "../Items/ItemsContainer";
import { NavLink } from 'react-router-dom';
import { Product, Wenslijst } from 'ClientApp/components/Items/ItemsInterfaces';

interface ItemPageState{
    product: Product | null;
    loaded : boolean;
}

export class ItemPage extends React.Component<RouteComponentProps<{}>, ItemPageState> {
    constructor(props){
        super(props);
        this.AddProductToShoppingCartLocalStorage = this.AddProductToShoppingCartLocalStorage.bind(this)
        this.AddProductToWishList = this.AddProductToWishList.bind(this)
        this.getItem = this.getItem.bind(this)

        this.state = {
            product : null,
            loaded : false,
        }

    }

    componentDidMount(){
        this.getItem();
    }

    getItem(){
        fetch('api/Items' + this.props.location.pathname)
        .then(response => response.json() as Promise<Product[]>)
        .then(data => {
            console.log(data[0].productId)
            this.setState({ product : data[0], loaded : true});
        });
    }

    AddProductToShoppingCartLocalStorage(){
        var itemlist = [];
        itemlist = JSON.parse(localStorage.getItem("Winkelmand"));
        if (itemlist != null){
            var item = {"name" : this.state.product.productNaam, "id" : this.state.product.productId, "price": this.state.product.productPrijs, "index" : itemlist.length, "console": this.state.product.consoleType, "image": this.state.product.productImg};
            itemlist.push(item)
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
            
        }
        else{
            var item = {"name" : this.state.product.productNaam, "id" : this.state.product.productId, "price": this.state.product.productPrijs, "index" : 0, "console": this.state.product.consoleType, "image": this.state.product.productImg};
            itemlist = [item]
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
        }
    }
    async AddProductToWishList(){
        let apiUrl = 'api/Wenslijsten/Post'
        let productToPost: Wenslijst = {
            wenslijstId: 0, 
            klantId: User.getStorageId(),
            productNmr: this.state.product.productId
        }
        let apiResponse = await fetch(apiUrl, {method: 'POST', body:JSON.stringify(productToPost), headers: new Headers({'content-type' : 'application/json'})});
        
    }
    //The objects have to be parsed to json because this.state doesn't allow an single object in the state
    render() {
        return <div  className={"ItemPageComponent"}>
                { this.state.loaded ?
                    <div className="container">
                        <h1> { this.state.product.productNaam } </h1>
                        <div className='col-md-3'>      
                            <img className="img-responsive" src={ this.state.product.productImg }/> 
                            <h2>
                                    {User.IsUserLoggedIn() ?
                                <button className="btn btn-primary" onClick={this.AddProductToWishList}> Toevoegen aan wenslijst</button>
                                    :
                                <div>
                                <button className="btn btn-danger"  data-toggle="modal" data-target="#myModalW"> Toevoegen aan wenslijst </button>
                                <div className="modal fade" id="myModalW" role="dialog">
                                <div className="modal-dialog modal-sm">
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Error</h4>
                                    </div>
                                    <div className="modal-body">
                                    <h4>Je moet ingelogd zijn om de wenslijst te kunnen gebruiken!</h4>
                                    <button type="button" className="btn btn-default" data-dismiss="modal" data-backdrop="false">Terug</button>
                                    </div>
                                </div>
                                </div>
                                </div>
                                </div>  
                                         }
                            </h2>                          
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModalM" onClick={this.AddProductToShoppingCartLocalStorage}>Toevoegen aan winkelmand</button>
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
                        </div>
                        <div className='col-md-4'>    
                            <h2> Prijs: €{ this.state.product.productPrijs }</h2>
                            { /* <h2> Leeftijd: { "dit moet nog ff toegevoegd worden" } </h2>  */}
                            <h2> Genre: { this.state.product.productGenre } </h2>
                            <h2> Console: { this.state.product.consoleType } </h2>
                            <h2> Beschrijving:</h2><p> { this.state.product.productOmschr } </p>      
                        </div>
                        <div className='col-md-3'>

                        </div>                
                    </div> 

                : <div> <h2> item is still being loaded... </h2> </div>
                }   
            </div>                     
    }
}