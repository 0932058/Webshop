import * as React from 'react';
import {accountsTableData} from "../DatabaseSimulation/FakeDatabase";
import {account} from "../DatabaseSimulation/TableTypes";
import {List} from "linqts";
import { RouteComponentProps } from 'react-router';
import {RegistratieContainer} from "../Registratie/RegistratieContainer";
import { Redirect } from 'react-router';
import {User} from "../User/User";

interface LoginContainerState{
    //to check if it needs to redirect to Home, there is a method in User class to check the login status
    userLoggedIn: boolean; 
    typedInUsername: string;
    typedInPassword: string;
    isRegisterButtonClick: boolean;
}
export class LoginContainer extends React.Component<RouteComponentProps<{}>, LoginContainerState> {
    constructor(){
        super();
        this.HandleChangeToInputFields = this.HandleChangeToInputFields.bind(this);
        this.CheckLoginInDatabase = this.CheckLoginInDatabase.bind(this);
        this.RegisterTheAccount = this.RegisterTheAccount.bind(this);
        this.ResultLogin = this.ResultLogin.bind(this);
        this.state = {typedInUsername:"", typedInPassword:"", isRegisterButtonClick: false, userLoggedIn: false}   
        this.CreateLoggedInUser = this.CreateLoggedInUser.bind(this);    
    }
    //When the user types into one of the fields, the result is saved to the state
    HandleChangeToInputFields(event: any){         
        if(event.target.name == "username"){
            this.setState({typedInUsername: event.target.value});    
        }
        else{
            this.setState({typedInPassword: event.target.value});   
        }           
    }
    //Checks if account with the given username and password exists
    CheckLoginInDatabase() : Promise<null|account>{
        var userAccount = accountsTableData.Where(account => account.username == this.state.typedInUsername && 
            account.password == this.state.typedInPassword).FirstOrDefault();
        if(userAccount == null){
            return Promise.reject("Incorrect login")
        }
        return Promise.resolve(userAccount);
    } 
    //Depending on the result of the CheckLoginInDatabase method, an pop up appears on the screen
    ResultLogin(event: any){
        event.preventDefault();
        this.CheckLoginInDatabase().then(userAccount => this.CreateLoggedInUser(userAccount))
        .catch(errorMessage => alert(errorMessage))
    }
    //Fetches the data (Pk, name etc) of the logged in user 
    CreateLoggedInUser(userAccount: account){
        var loggedInUser = User.CreateUser();
        loggedInUser.SetAccount(userAccount);
        this.setState({userLoggedIn: true})
    }
    //When the user clicks the register button
    RegisterTheAccount(){
        this.setState({isRegisterButtonClick: true})
    }
    render(){
   
        return(
            <div className={"LoginContainer"}>
            
            <div> <h1> Log in </h1> </div>
            <form  onSubmit={this.ResultLogin} onChange={this.HandleChangeToInputFields}>
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
            <button onClick={this.RegisterTheAccount}> Register </button>   
            </form>       
            <div>            
            </div>    
            {this.state.userLoggedIn ?
            <Redirect to={"/"} push={true}/>
            :
            this.state.isRegisterButtonClick?
             <Redirect to={"/Registratie"} push={true}/>
            :
            <div> </div>
            }
            }        
            </div>
        )}
}
export default LoginContainer;