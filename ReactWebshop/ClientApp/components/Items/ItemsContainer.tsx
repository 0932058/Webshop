import * as React from 'react';
import { List } from "linqts";
import { ProductPage } from "../ProductPage/ProductPageContainer";
import { RouteComponentProps } from 'react-router';
import { User } from "../User/User";
import { Link, NavLink } from 'react-router-dom';
import { ReactInterval } from 'react-interval';

interface ItemsContainerState{
    loaded : boolean;
    items : Product[] | null; //The products get put in the list by date
    currentSearch : string;
}
export class ItemsContainer extends React.Component<RouteComponentProps<{}>, ItemsContainerState> {
    months : string[];

    constructor(props){
        super(props);

        this.getItems = this.getItems.bind(this);
        this.putNewItem = this.putNewItem.bind(this);

        this.months = ["Januari", "Februari", "Maart", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ],

        this.state = {
            loaded : false,
            items : null,
            currentSearch : "",
        };
    }

    componentDidMount(){
        this.getItems();
    }

    getItems(){
        //this determines what needs to be loaded, according to the pathname of the route
        var api = '';
        if ( this.props.location.pathname === '/'){
            api = 'api/Items/Home';
        }else{
            if( this.props.location.pathname === '/Search' ){
                api = 'api/Search/SearchFor/' + sessionStorage.getItem("Search").toString()
                this.setState({
                    currentSearch : sessionStorage.getItem("Search").toString()
                })
            }else{
                api = 'api/Items' + this.props.location.pathname
            }
        }


        fetch(api)
        .then(response => response.json() as Promise<Product[]>)
        .then(data => {
            this.setState({ items : data, loaded : true});
        });
    }

    putNewItem(){
        fetch('api/Items/Post', {method: 'POST', headers : new Headers({'content-type' : 'application/json'})});
        this.getItems();
    }

    render(){
   
        return(

            <div  className={"Container"}>

            {this.props.location.pathname.toString() === "/"?
            <div> <h1>Nieuwste producten van maand { this.months[new Date().getMonth()]}! </h1> </div> 
            :
            <div/>
            }

            <ReactInterval timeout={500} enabled={true}
                callback={
                    () => this.state.currentSearch != sessionStorage.getItem("Search")? 
                            this.getItems() :
                            console.log(this.state.currentSearch, sessionStorage.getItem("Search"))
                    } 
                    />


            <div  className={"ItemsContainerScroll"}> 
                {this.state.loaded? 

                    this.state.items.map(
                        item => {

                            return (
                                <div className={"Component"}>

                                <img src={ item.productImg }/>

                                    <div className="ComponentInfo"> 

                                    <h2>{ item.productNaam } </h2>

                                    <p> Console: {item.consoleType} </p>

                                    <p> Prijs: {"€" + item.productPrijs } </p>

                                    <p> { item.aantalInVooraad + " " } in voorraad </p>

                                    <NavLink to={ '/Item/' + item.productId } exact activeClassName='Active'className='button_to_product'>
                                        naar Product
                                    </NavLink>

                                    </div> 
                                </div>
                            )
                        }
                    )
                    :
                    <h1> nothing found... </h1>
                }

            </div>


            </div>
        )}
}