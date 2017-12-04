import * as React from 'react';

import { Route } from 'react-router-dom';
import { UserNotLoggedInMenu } from "./LoginAndLogout/UserNotLoggedInMenuLayout";
import { ZijMenu } from './ZijMenu';
import { SearchContainer } from "../components/Items/SearchContainer";
import { UserLoggedInMenu } from "./LoginAndLogout/UserLoggedInMenuLayout";
import { User } from "./User/User";
import { ItemPage } from "../components/ProductPage/ItemPage";
import { ItemsContainer } from "../components/Items/ItemsContainer";
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

//The components used for the layout is in the render method
//The components are always displayed on screen

export interface LayoutProps {
    children?: React.ReactNode;
}

interface LayoutState {
    pages : React.ReactNode;
    foundProducts : Product[];
    search : string;
}

export class Layout extends React.Component<LayoutProps, LayoutState> {

    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            pages : [],
            foundProducts : [],
            search : "",
        }

        fetch('api/Items/GetAllId')
        .then(response => response.json() as Promise<number[]>)
        .then(data => {
            var newList = [];

            for(var x = 0; x < 26; x++){
                newList[x] = this.props.children[x];
            }

            data.map( 
                id => {
                    newList[id] = (<Route path={"/Item/" + id}  component={ItemPage}/>);
                }
            );

            this.setState({
                pages : newList,
            })
        });
    }

    handleChange(event : any){
        var search = event.target.value

        this.setState({
            search,
        })

        sessionStorage.Search = event.target.value

        console.log(sessionStorage.Search);

        event.preventDefault();
    }

    handleSubmit(event : any){

        this.setState({
            search : ""
        })

        event.preventDefault();
    }

    public render() {
        const topBar = (
            <div className="UserNotLoggedInMenuLayout" >  
                <NavLink to={ '/' } exact activeClassName='active' className='LinksNav'>
                    Home
                </NavLink>
            
                <NavLink to={ '/Login' } exact activeClassName='active'className='LinksNav'>
                    Login
                </NavLink>
            
                <NavLink to={ '/Registratie' } exact activeClassName='active'className='LinksNav'>
                    Registreer
                </NavLink>

                <NavLink to={ '/Winkelmand' } exact activeClassName='active'className='LinksNav'>
                     Winkelmand
                </NavLink>

                    <form onSubmit={ this.handleSubmit } >
                        <input placeholder="Zoek naar product" type="text" value={this.state.search} onChange={this.handleChange} />
                        <NavLink to={ '/Search' } exact activeClassName='active'className='LinksNav'> 
                            <input type="submit" value="Zoek naar product"/>
                        </NavLink>
                    </form>

            </div>
        )

        const topBarLoggedIn = (
            <div className="UserLoggedInMenuLayout">                     
                <NavLink to={ '/' } exact activeClassName='active' className='LinksNav'>
                    Home
                </NavLink>    

                <NavLink to={ '/Profile' } exact activeClassName='active' className='LinksNav'>
                    Profile
                </NavLink>  

                <NavLink to={ '/Bestellingen' } exact activeClassName='active'className='LinksNav'>
                    Bestellingen
                </NavLink>

                <NavLink to={ '/Wenslijst' } exact activeClassName='active'className='LinksNav'>
                    Wenslijst
                </NavLink>

                <NavLink to={ '/Winkelmand' } exact activeClassName='active'className='LinksNav'>
                    Winkelmand
                </NavLink> 

                <NavLink to={ '/Logout' } exact activeClassName='active'className='LinksNav'>
                    Log uit
                </NavLink>

                

            </div>
        )

        const ZijMenu = (
            <nav className="Zijbalk">
            <h2>Consoles</h2>
            <ul>
            <li>
                <NavLink to={ '/Consoles/Xbox360' } exact activeClassName='active' className='LinksSide'>
                   Xbox 360
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/Consoles/XboxOne' } exact activeClassName='active'className='LinksSide'>
                    Xbox One
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/Consoles/Playstation3' } exact activeClassName='active' className='LinksSide'>
                   Playstation 3
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/Consoles/Playstation4' } exact activeClassName='active' className='LinksSide'>
                   Playstation 4
                </NavLink>
                </li>
            </ul>
            <h2>Games</h2>
            <ul>
                <li>
                <NavLink to={ '/Games/Action' } exact activeClassName='Active'className='LinksSide'>
                    Action
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/Games/Shooter' } exact activeClassName='Avontuur'className='LinksSide'>
                    Shooter
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/Games/Fantasie' } exact activeClassName='active'className='LinksSide'>
                    Fantasie
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/Games/Sport' } exact activeClassName='active'className='LinksSide'>
                    Sport
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/Games/Sandbox' } exact activeClassName='active'className='LinksSide'>
                    Sandbox
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/Games/Fight' } exact activeClassName='active'className='LinksSide'>
                    Fight
                </NavLink>
                </li>
                
            </ul>
            <h2>Accessoires</h2>
            <ul>
                <li>
                <NavLink to={ '/Accessoires/Headsets' } exact activeClassName='active'className='LinksSide'>
                    Headsets
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/Accessoires/Racewheels' } exact activeClassName='active'className='LinksSide'>
                    Race-Wheels
                </NavLink>
                </li>
            </ul>
        </nav>
        )

        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'> 
        
                {
                    User.IsUserLoggedIn()?
                        topBarLoggedIn :
                            topBar
                }

                { ZijMenu }

                </div>

                <div  className='col-sm-9'>

                    { this.state.pages } 

                </div>

                
            </div>
        </div>;
    }
}
