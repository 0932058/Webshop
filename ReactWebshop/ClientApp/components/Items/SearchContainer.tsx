import * as React from 'react';
import { List } from "linqts";
import { ProductPage } from "../ProductPage/ProductPageContainer";
import { RouteComponentProps } from 'react-router';
import { User } from "../User/User";
import { Link, NavLink } from 'react-router-dom';


export class SearchContainer extends React.Component<RouteComponentProps<{}>, {}> {

    constructor(props){
        super(props);

        console.log("i mounted");
    }

    componentDidMount(){
        console.log("i mounted");
    }

    render(){
   
        return(
            <div>
                <h1> works </h1>
            </div>
        )}
}