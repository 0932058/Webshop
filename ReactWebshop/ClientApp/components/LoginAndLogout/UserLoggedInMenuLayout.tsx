import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {User} from "../User/User";
//import {SearchBarMenu} from "../Search/SearchBarMenu";

//The menu when the user is logged in

export class UserLoggedInMenu extends React.Component<{}, {}> {
    constructor(){
        super();  
    } 
    public render() {
        return <nav className="UserLoggedInMenuLayout">                     
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
                            {/* <SearchBarMenu/> */}
        </nav>;    
    }
}
export default UserLoggedInMenu;