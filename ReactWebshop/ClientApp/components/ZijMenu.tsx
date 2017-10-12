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
                <NavLink to={ '/' } exact activeClassName='Active'className='LinksSide'>
                    <span ></span> Actie
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/' } exact activeClassName='Avontuur'className='LinksSide'>
                    <span ></span> Xbox
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/' } exact activeClassName='active'className='LinksSide'>
                    BattleRoyal
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
