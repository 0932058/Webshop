import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <nav className="homebalk">
                            <NavLink to={ '/' } exact activeClassName='active' className='LinksNav'>
                                <span ></span> Home
                            </NavLink>
                            <NavLink to={ '/' } exact activeClassName='active'className='LinksNav'>
                                <span ></span> Profiel
                            </NavLink>
                            <NavLink to={ '/' } exact activeClassName='active'className='LinksNav'>
                                <span ></span> Login
                            </NavLink>
                            <NavLink to={ '/' } exact activeClassName='active'className='LinksNav'>
                                <span ></span>Registreer
                            </NavLink>
            <NavLink to={ '/Winkelmand' } exact activeClassName='active'className='LinksNav'>
                                <span ></span> Winkelmand
                            </NavLink>
            <form><input type="text" name="SearchString"/></form>
            <a href="Zoeken.html"><button>Zoeken</button></a>
        </nav>;
    }
}
