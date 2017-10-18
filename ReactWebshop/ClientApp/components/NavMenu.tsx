import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {SearchContainer} from "./Search/SearchContainer";

//The navigation menu of the top bar

export class NavMenu extends React.Component<{}, {}> {
    constructor(){
        super();
    }
    public render() {
        return <nav className="homebalk">
                            <NavLink to={ '/' } exact activeClassName='active' className='LinksNav'>
                                Home
                            </NavLink>
                            <NavLink to={ '/Registratie' } exact activeClassName='active'className='LinksNav'>
                                Registreer
                            </NavLink>
                            <NavLink to={ '/Login' } exact activeClassName='active'className='LinksNav'>
                                Login
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
        
        </nav>;
    }
}
