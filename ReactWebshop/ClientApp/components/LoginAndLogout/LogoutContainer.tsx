import * as React from 'react';

import {List} from "linqts";
import { RouteComponentProps } from 'react-router';
import {RegistratieContainer} from "../Registratie/RegistratieContainer";
import { Redirect } from 'react-router';
import {User} from "../User/User";


interface LogoutContainerstate {
   loaded: boolean;
}
export class LogoutContainer extends React.Component<RouteComponentProps<{}>, LogoutContainerstate> {
    constructor(){
        super();
        this.LogUserOut = this.LogUserOut.bind(this);
        this.state = {loaded: false}    
    }
    componentWillMount(){
        this.LogUserOut().then(() => this.setState({loaded: true}))
        .catch((errorMessage) => errorMessage )           
    }
    LogUserOut() : Promise<void>{
        User.LogUserOut();
        if(User.IsUserLoggedIn()){
            return Promise.reject("Something went wrong with logging out")      
        }
        return Promise.resolve();    
    }  
    render(){  
        return(
            <div className={"Container"}>
            {this.state.loaded? 
            <Redirect exact to={"/"} push={true}/>
            :
            <div> Loading...</div>
            }     
            </div>
        )}
}
export default LogoutContainer;