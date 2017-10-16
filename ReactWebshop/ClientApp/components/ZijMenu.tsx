import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class ZijMenu extends React.Component<{}, {}> {
    public render() {
        return <nav className="Zijbalk">
            <h2>Consoles</h2>
            <ul>
                <li>
                <NavLink to={ '/' } exact activeClassName='active'className='LinksSide'>
                    Xbox
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/' } exact activeClassName='active' className='LinksSide'>
                   Playstation
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
                <NavLink to={ '/Games/Fantasy' } exact activeClassName='active'className='LinksSide'>
                    Fantasy
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
                <NavLink to={ '/' } exact activeClassName='active'className='LinksSide'>
                    Headsets
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/' } exact activeClassName='active'className='LinksSide'>
                    Race-Wheels
                </NavLink>
                </li>
            </ul>
        </nav>;
    }
}
