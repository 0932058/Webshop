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
        var shoppingCartList = [];
        if(localStorage.getItem("Winkelmand") != null){
            shoppingCartList = JSON.parse(localStorage.getItem("Winkelmand"));
            shoppingCartList.push(this.props.location.pathname);
            localStorage.setItem("Winkelmand", JSON.stringify(shoppingCartList));
        }
        else{
            var shoppingCartList = [];
            localStorage.setItem("Winkelmand", JSON.stringify(shoppingCartList));
        }
    }
    //The objects have to be parsed to json because this.state doesn't allow an single object in the state
    render() {
        return <div  className={"ItemPageComponent"}>
                 

                { this.state.loaded ?

                <div className="ItemPageComponentScroll">

                <h1> { this.state.product.productNaam } </h1>
                <div>      

                    <img src={ this.state.product.productImg }  width={300} height={50} />   
                    
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