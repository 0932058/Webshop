import * as React from 'react';
import { List } from "linqts";
import { ProductPage } from "../ProductPage/ProductPageContainer";
import { RouteComponentProps } from 'react-router';
import { User } from "../User/User";
import { Link, NavLink } from 'react-router-dom';
import { Product } from 'ClientApp/components/Items/ItemsInterfaces';

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
            api = 'api/Items' + this.props.location.pathname
            console.log('api/Items' + this.props.location.pathname)
        }


        fetch(api)
        .then(response => response.json() as Promise<Product[]>)
        .then(data => {
            this.setState({ items : data, loaded : true});
            console.log(data[0])
        });
    }

    putNewItem(){
        fetch('api/Items/Post', {method: 'POST', headers : new Headers({'content-type' : 'application/json'})});
        this.getItems();
    }

    render(){
   
        return(

            <div  className="container">
            {this.props.location.pathname.toString() === "/"?
            <div className='co-md-12'> <h1>Nieuwste producten van maand { this.months[new Date().getMonth()]}! </h1> </div> 

            :
            <div/>
            }
            
            <div  className={"ItemsContainerScroll"}>

                {this.state.loaded? 

                    this.state.items.map(
                        
                        item => {

                            return (
                                <div className={"Component"}>
                                    <div className='container' id='maingame'>
                                        <div className='col-md-2'>
                                            <NavLink to={'/Item/'+ item.productId}><img className="img-responsive" src={ item.productImg }/></NavLink>
                                        </div>
                                        <div className='col-md-2'>
                                            <h2>{ item.productNaam } </h2>
                                            <p> Console: {item.consoleType} </p>
                                            <p> Prijs: {"€" + item.productPrijs } </p>
                                            <p> { item.aantalInVooraad + " " } in voorraad </p>
                                            <NavLink to={ '/Item/' + item.productId } exact activeClassName='Active'className='button_to_product'>
                                                <button className={"btn btn-primary"} > naar product </button>
                                            </NavLink>


                                        </div>
                                    </div>
                                </div> 
                            )
                        }
                    )
                    :
                    <div className="sk-fading-circle">
                        <div className="sk-circle1 sk-circle"></div>
                        <div className="sk-circle2 sk-circle"></div>
                        <div className="sk-circle3 sk-circle"></div>
                        <div className="sk-circle4 sk-circle"></div>
                        <div className="sk-circle5 sk-circle"></div>
                        <div className="sk-circle6 sk-circle"></div>
                        <div className="sk-circle7 sk-circle"></div>
                        <div className="sk-circle8 sk-circle"></div>
                        <div className="sk-circle9 sk-circle"></div>
                        <div className="sk-circle10 sk-circle"></div>
                        <div className="sk-circle11 sk-circle"></div>
                        <div className="sk-circle12 sk-circle"></div>
                    </div>
                }

            </div>


            </div>
        )}
}