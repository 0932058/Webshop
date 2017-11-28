import * as React from 'react';
import {List} from "linqts";
import {ProductPage} from "../ProductPage/ProductPageContainer";
import { RouteComponentProps } from 'react-router';
//import * as moment from "moment"; //For the date
import {User} from "../User/User";
import { Link, NavLink } from 'react-router-dom';
import { Game } from "./ItemsInterfaces"

interface ItemsContainerState{
    loaded : boolean;
    games : Game[] | null; //The products get put in the list by date
    isHome : string;
}
export class ItemsContainer extends React.Component<RouteComponentProps<{}>, ItemsContainerState> {
    constructor(props){
        super(props);

        this.state = {
            loaded : false,
            games : null,
            isHome : "",
        };

        console.log(this.props.location.pathname);

        fetch('api/Items' + this.props.location.pathname + (this.props.location.pathname ? "Home" : ""))
        .then(response => response.json() as Promise<Game[]>)
        .then(data => {
            this.setState({ games : data, loaded : true});
        });

    }

    render(){
   
        return(
            <div  className={"Container"}>
            <div> <h1>Nieuwste producten van maand {new Date().getMonth() + 1}! </h1> </div> 
            <div  className={"ItemsContainerScroll"}> 
            
                { this.state.loaded? 
                    this.state.games.map(
                        item => {
                            return (
                                <div className={"Component"}>
                                <img src={ item.img }/>
                                    <div className="ComponentInfo"> 
                                    <h2>{ item.name } </h2>
                                    <p> Console: PS + XBOX </p>
                                    <p> Prijs: {"€" + item.price} </p>
                                    <NavLink to={ '/Item/' + item.id } exact activeClassName='Active'className='LinksSide'>
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