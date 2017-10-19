import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

//The navigation menu (links) of the side bar for profile page

export class ProfileSideMenuLinks extends React.Component<{}, {}> {
    public render() {
        return <nav className="ProfileSideMenuLinks">
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
                <NavLink to={ '/Wenslijst' } exact activeClassName='active' className='LinksSide'>
                   Wenslijst
                </NavLink>
                </li>
            </ul>
        </nav>;
    }
}
export default ProfileSideMenuLinks;