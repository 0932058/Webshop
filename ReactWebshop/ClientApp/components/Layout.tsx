import * as React from 'react';
import { NavMenu } from './NavMenu';
import {ZijMenu} from './ZijMenu';
import {SearchBarMenu} from "./Search/SearchBarMenu";

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <SearchBarMenu/>
                    <NavMenu />           
                    <ZijMenu/>
                 
                 
              
                </div>
                <div className='col-sm-9'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
