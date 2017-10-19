import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {ProfileSideMenuLayout} from "./Layout/ProfileSideMenuLayout";

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