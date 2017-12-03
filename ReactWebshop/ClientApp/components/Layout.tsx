import * as React from 'react';

import { Route } from 'react-router-dom';
import { UserNotLoggedInMenu } from "./LoginAndLogout/UserNotLoggedInMenuLayout";
import {ZijMenu} from './ZijMenu';
//import {SearchBarMenu} from "./Search/SearchBarMenu";
import {UserLoggedInMenu} from "./LoginAndLogout/UserLoggedInMenuLayout";
import {User} from "./User/User";
import { ItemPage } from "../components/ProductPage/ItemPage";
import { ItemsContainer } from "../components/Items/ItemsContainer";

//The components used for the layout is in the render method
//The components are always displayed on screen

export interface LayoutProps {
    children?: React.ReactNode;
}
interface LayoutState {
    pages : React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor(props){
        super(props)

        this.state = {
            pages : [],
        }
    }

    /*
    componentDidMount(){
        fetch('api/Items/GetAllId')
        .then(response => response.json() as Promise<number[]>)
        .then(data => {
            var newList = [];

            for(var x = 0; x < 26; x++){
                newList[x] = this.props.children[x];
            }

            data.map( 
                id => {
                    newList[27 + id] = (<Route path={"/Item/" + id}  component={ItemPage}/>);
                }
            );

            this.setState({
                pages : newList,
            })

            console.log(newList[28])
            console.log(this.props.children[0])
        });
    }*/

    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'> 

                <ZijMenu/>       

                </div>
                
                <div className='col-sm-9'>
                    { this.props.children }
                </div>

            </div>
        </div>;
    }
}
