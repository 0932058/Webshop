import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {SearchBarMenu} from "../Search/SearchBarMenu";

//The navigation menu of the top bar when the user is not logged in

export class UserNotLoggedInMenu extends React.Component<{}, {}> {
    constructor(){
        super();
    }
    public render() {
        return <nav className="UserNotLoggedInMenuLayout">
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

                            <SearchBarMenu />                                     
        </nav>;
    }
}
export default UserNotLoggedInMenu;