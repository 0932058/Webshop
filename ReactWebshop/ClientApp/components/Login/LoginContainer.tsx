import * as React from 'react';
import {accountsTableData} from "../DatabaseSimulation/FakeDatabase";
import {List} from "linqts";
import {LoginComponent} from "./LoginComponent";
import { RouteComponentProps } from 'react-router';

//Login container

interface LoginContainerState{
    typedInUsername: string;
    typedInPassword: string;
}
export class LoginContainer extends React.Component<RouteComponentProps<{}>, LoginContainerState> {
    constructor(){
        super();
        this.HandleChange = this.HandleChange.bind(this);
        this.CheckLoginInDatabase = this.CheckLoginInDatabase.bind(this);
        this.state = {typedInUsername:"", typedInPassword:""}       
    }
    HandleChange(event: any){         
        if(event.target.name == "username"){
            this.setState({typedInUsername: event.target.value});    
        }
        else{
            this.setState({typedInPassword: event.target.value});   
        }           
    }
    CheckLoginInDatabase(event: any){
        event.preventDefault();
        var result = accountsTableData.Where(account => account.username == this.state.typedInUsername && 
            account.password == this.state.typedInPassword).FirstOrDefault();
        if(result == null){
            alert("Username or password is incorrect!")
        }
        else{
            alert("Successfull logged in!");
        }
    }
    render(){
   
        return(
            <div className={"LoginContainer"}>
            <div> <h1> Log in </h1> </div>
            <form  onSubmit={this.CheckLoginInDatabase} onChange={this.HandleChange}>
            <div>
            <label>
                Username:         
                <input type="text" name="username" value={this.state.typedInUsername} />               
            </label>
            </div>
            <div>
            <label>
                Password:       
                <input type="text" name="password"  value={this.state.typedInPassword} />             
            </label>
            </div>
            <input type="submit" value="Submit"  />
            <button> Registreren </button>   
            </form>       
            <div>            
            </div>            
            </div>
        )}
}
export default LoginContainer;