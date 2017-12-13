import * as React from 'react';
import {ProfileSideMenuLinks} from "./ProfileSideMenuLinks";

//Side menu for the profile page

export interface LayoutProps {
    children?: React.ReactNode;
}
export class ProfileSideMenuLayout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='ProfileSideMenuLayout'>
            <div className='row'>
                <div className='col-sm-5'>
                    <ProfileSideMenuLinks/>                                                                     
                </div>
                <div className='col-sm-7'>
                { this.props.children }
                </div>
            </div>
        </div>;
    }
}
export default ProfileSideMenuLayout;