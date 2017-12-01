import * as React from 'react';
import { List } from "linqts";
import { ProductPage } from "../ProductPage/ProductPageContainer";
import { RouteComponentProps } from 'react-router';
import { User } from "../User/User";
import { Link, NavLink } from 'react-router-dom';


interface ItemsContainerState{
    loaded : boolean;
    items : Product[] | null; //The products get put in the list by date
}
export class ItemsContainer extends React.Component<RouteComponentProps<{}>, ItemsContainerState> {
    months : string[];

    constructor(props){
        super(props);

        this.months = ["Januari", "Februari", "Maart", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ],

        this.state = {
            loaded : false,
            items : null,
        };

        //this determines what needs to be loaded, according to the pathname of the route
        var xtra = '';
        if (this.props.location.pathname === '/'){
            xtra = '/Home';
        }else{
            xtra = this.props.location.pathname
        }


        fetch('api/Items' + xtra)
        .then(response => response.json() as Promise<Product[]>)
        .then(data => {
            console.log(data)
            this.setState({ items : data, loaded : true});
        });
    }

    render(){
   
        return(
            <div  className={"Container"}>

            <div> <h1>Nieuwste producten van maand { this.months[new Date().getMonth()] }! </h1> </div> 

            <div  className={"ItemsContainerScroll"}> 
                {this.state.loaded? 

                    this.state.items.map(
                        item => {

                            return (
                                <div className={"Component"}>

                                <img src={ item.productImg }/>

                                    <div className="ComponentInfo"> 

                                    <h2>{ item.productNaam } </h2>

                                    <p> Console: PS + XBOX </p>

                                    <p> Prijs: {"€" + item.productPrijs } </p>

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