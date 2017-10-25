import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

//The navigation menu (links) of the side bar for profile page

export class ProfileSideMenu extends React.Component<{}, {}> {
    public render() {
        return <nav className="ProfileMenu">
            <h2>Profiel</h2>
            <ul>
            <li>
                <NavLink to={ '/Profile/Gegevens' } exact activeClassName='active' className='LinksSide'>
                   Gegevens
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/Winkelmand' } exact activeClassName='active'className='LinksSide'>
                    Winkelmand
                </NavLink>
                </li>
                <li>
                <NavLink to={ '/Profile/Wenslijst' } exact activeClassName='active' className='LinksSide'>
                   Wenslijst
                </NavLink>
                </li>
            </ul>
        </nav>;
    }
};