import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

//The navigation menu (links) of the side bar for profile page

export class ProfileSideMenuLinks extends React.Component<{}, {}> {
    public render() {
        return <nav className="ProfileSideMenuLinks">
                    <h2>Profiel</h2>
                    <div className="list-group">
                    </div>
        </nav>;
    }
}
export default ProfileSideMenuLinks;