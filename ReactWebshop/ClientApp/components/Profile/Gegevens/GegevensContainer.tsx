import * as React from 'react';
import {accountsTableData} from "../../DatabaseSimulation/FakeDatabase";
import {account} from "../../DatabaseSimulation/TableTypes";
import {List} from "linqts";
import { RouteComponentProps } from 'react-router';
import {RegistratieContainer} from "../../Registratie/RegistratieContainer";
import { Redirect } from 'react-router';
import {User} from "../../User/User";
import {GegevensComponent} from "./GegevensComponent";
import {ProfileSideMenuLayout} from "../Layout/ProfileSideMenuLayout";

//Login container

interface GegevensContainerState{
    user: User;
    loaded: boolean;
   
}
export class GegevensContainer extends React.Component<RouteComponentProps<{}>, GegevensContainerState> {
    constructor(){
        super();
        this.state = {loaded: false, user: null} 
        this.CreateUser = this.CreateUser.bind(this);   
    }
    componentWillMount(){
        this.CreateUser().then(loggedInUser => this.setState({user: loggedInUser, loaded: true}))
    }
    CreateUser() : Promise<User>{
        var foundUserinDB = accountsTableData.Where(account => account.pk == 1).FirstOrDefault();
        var loggedInUser = User.CreateUser();
        loggedInUser.SetAccount(foundUserinDB);
        return Promise.resolve(loggedInUser);  
    }
    render(){  
        return(
           
            <ProfileSideMenuLayout>
            <div>         
                <div className={"GegevensContainer"}>
                {this.state.loaded? 
                <GegevensComponent user={this.state.user} />
                :
                <div> Loading...</div>
                }
            </div>        
            </div>
            </ProfileSideMenuLayout>
            
        )
    }     
}
export default GegevensContainer;