import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

//The navigation menu (links) of the side bar for profile page

export class ProfileSideMenuLinks extends React.Component<{}, {}> {
    public render() {
        return <nav className="ProfileSideMenuLinks">
                    <h2>Profiel</h2>
                    <div className="list-group">
                        <NavLink to={"/Profile/Gegevens"} className="list-group-item"><span className="glyphicon glyphicon-user">  Gegevens</span></NavLink>
                        <NavLink to={"/Winkelmand"} className="list-group-item"><span className="glyphicon glyphicon-shopping-cart">  Winkelmand</span></NavLink>
                        <NavLink to={"/Wenslijst"} className="list-group-item"><span className='glyphicon glyphicon-heart'>   Wenslijst</span></NavLink>
                    </div>
        </nav>;
    }
}
export default ProfileSideMenuLinks;