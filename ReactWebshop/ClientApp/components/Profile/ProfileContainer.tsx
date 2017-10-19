import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {ProfileSideMenuLayout} from "./Layout/ProfileSideMenuLayout";

//When the profile gets clicked it gets redirected to this empty profile page

export class ProfileContainer extends React.Component<RouteComponentProps<{}>, {}> {
    constructor(){
        super();
    }
    render(){  
        return(         
         <ProfileSideMenuLayout>
            <div> </div>      
            </ProfileSideMenuLayout>                       
        )
    }     
}
export default ProfileContainer;