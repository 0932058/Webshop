import * as React from 'react';
import {gameTableData, consoleTableData, accessoiresTableData, accountsTableData} from "../DatabaseSimulation/FakeDatabase";
import {product, user} from "../DatabaseSimulation/TableTypes";
import {List} from "linqts";
import {ProductPage} from "../ProductPage/ProductPageContainer";
import { RouteComponentProps } from 'react-router';
//import * as moment from "moment"; //For the date
import {User} from "../User/User";
import { Link, NavLink } from 'react-router-dom';

interface ItemsContainerState{
    loaded : boolean;
    products : number[] | null; //The products get put in the list by date
    isHome : string;
    isTest : string;
}
export class SearchContainer extends React.Component<RouteComponentProps<{}>, ItemsContainerState> {
    constructor(props){
        super(props);

        this.postProduct = this.postProduct.bind(this);

        this.state = {
            loaded : false,
            products : null,
            isHome : "",
            isTest : 'still loading',
        };

        //this determines what needs to be loaded
        var xtra = '';
        if (this.props.location.pathname === '/'){
            xtra = '/Home';
        }else{
            xtra = this.props.location.pathname
        }

        console.log(this.props.location.pathname)

        fetch('api/Search/Get')
        .then(response => response.json() as Promise<number[]>)
        .then(data => {
            console.log(data)
            this.setState({ products : data, loaded : true});
        });
    }

    postProduct(){
        fetch('api/Items/Post', {method: 'POST', headers: new Headers({'content-type' : 'application/json'})});
    }

    getProduct(){
    }

    render(){
   
        return(
            <div  className={"Container"}>
            <div> <h1>Nieuwste producten van maand {new Date().getMonth() + 1}! </h1> </div> 
            <div  className={"ItemsContainerScroll"}> 

            <h1> { localStorage.getItem('search').toString() } </h1>

            <button onClick={ this.postProduct } > click me to add a product </button>
            
                { this.state.loaded? 
                    this.state.products.map(
                        item => {
                            return (
                                <div className={"Component"}>
                                <img src={ item.productImg }/>
                                    <div className="ComponentInfo"> 
                                    <h2>{ item.productNaam } </h2>
                                    <p> Console: PS + XBOX </p>
                                    <p> Prijs: {"€" + item.price} </p>
                                    <NavLink to={ '/Item/' + item.ProductId } exact activeClassName='Active'className='LinksSide'>
                                        naar Product
                                    </NavLink>
                                    </div> 
                                </div>
                            )
                        }
                    )
                    :
                    <h1> still loading... </h1>
                }

            </div>


            </div>
        )}
}