import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {User} from "../User/User";

interface ItemPageState{
    product: Product | null;
    loaded : boolean;
}

export class ItemPage extends React.Component<RouteComponentProps<{}>, ItemPageState> {
    constructor(props){
        super(props);
        this.AddProductToShoppingCartLocalStorage = this.AddProductToShoppingCartLocalStorage.bind(this)
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
            alert(this.state.product.productNaam +" is aan de winkelmand toegevoegd.")
        }
        else{
            var item = {"name" : this.state.product.productNaam, "id" : this.state.product.productId, "price": this.state.product.productPrijs, "index" : 0, "console": this.state.product.consoleType, "image": this.state.product.productImg};
            itemlist = [item]
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
            
            alert(this.state.product.productNaam +" is aan de winkelmand toegevoegd.")
        }
    }
    //The objects have to be parsed to json because this.state doesn't allow an single object in the state
    render() {
        return <div  className={"ItemPageComponent"}>
                 

                { this.state.loaded ?

                <div className="ItemPageComponentScroll">

                <h1> { this.state.product.productNaam } </h1>
                <div>      

                    <img src={ this.state.product.productImg }  width={300} />   
                    
                    <div className="ItemPageComponentInfo">   

                        <h2> Beschrijving:</h2><p> { this.state.product.productOmschr } </p>
                        <h2> Prijs: € { this.state.product.productPrijs } </h2>

                        <div>
                            <h2> Leeftijd: { "dit moet nog ff toegevoegd worden" } </h2>
                            <h2> Genre: { this.state.product.productGenre } </h2>
                            <h2> Console: { this.state.product.consoleType } </h2>
                            
                        </div>  
                        
                    </div>
                </div>

                    <h2>
                    <button onClick={this.AddProductToShoppingCartLocalStorage}  > Toevoegen aan winkelwagen</button>
                        {User.IsUserLoggedIn() ?
                        <button > Toevoegen aan wenslijst</button>
                        :
                        <div> </div>
                        }
             
                </h2> 

                </div> 

                : <div> <h2> item is still being loaded... </h2> </div>
                }   
            </div>                     
    }
}