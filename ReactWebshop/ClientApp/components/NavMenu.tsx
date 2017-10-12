import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <nav className="homebalk">
                            <NavLink to={ '/' } exact activeClassName='active' className='LinksNav'>
                                Home
                            </NavLink>
                            <NavLink to={ '/' } exact activeClassName='active'className='LinksNav'>
                                Profiel
                            </NavLink>
                            <NavLink to={ '/' } exact activeClassName='active'className='LinksNav'>
                                Login
                            </NavLink>
                            <NavLink to={ '/' } exact activeClassName='active'className='LinksNav'>
                                Registreer
                            </NavLink>
                            <NavLink to={ '/Winkelmand' } exact activeClassName='active'className='LinksNav'>
                                    Winkelmand
                            </NavLink>
            <form><input type="text" name="SearchString"/></form>
            <a href="Zoeken.html"><button>Zoeken</button></a>
        </nav>;
    }
}
