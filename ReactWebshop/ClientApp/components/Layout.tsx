import * as React from 'react';
import { UserNotLoggedInMenu } from "./LoginAndLogout/UserNotLoggedInMenuLayout";
import {ZijMenu} from './ZijMenu';
import {SearchBarMenu} from "./Search/SearchBarMenu";
import {UserLoggedInMenu} from "./LoginAndLogout/UserLoggedInMenuLayout";
import {User} from "./User/User";


//The components used for the layout is in the render method
//The components are always displayed on screen

export interface LayoutProps {
    children?: React.ReactNode;
}
export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>               
                    <SearchBarMenu   />            
                    <ZijMenu/>     
                    {User.IsUserLoggedIn() ?
                    <UserLoggedInMenu/>
                    :
                    <UserNotLoggedInMenu />                  
                }                                                                
                </div>
                <div className='col-sm-9'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
