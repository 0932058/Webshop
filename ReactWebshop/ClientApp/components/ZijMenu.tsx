import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

//The navigation menu of the side bar

export class ZijMenu extends React.Component<{}, {}> {
    public render() {
        return <nav className="Zijbalk">
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
        </nav>;
    }
}
