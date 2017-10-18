import * as React from 'react';
import {accountsTableData} from "../DatabaseSimulation/FakeDatabase";
import {account} from "../DatabaseSimulation/TableTypes";
import {List} from "linqts";
import { RouteComponentProps } from 'react-router';
import {RegistratieContainer} from "../Registratie/RegistratieContainer";
import { Redirect } from 'react-router';

//Login container

interface LoginContainerState{
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
        this.state = {typedInUsername:"", typedInPassword:"", isRegisterButtonClick: false}       
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
        var possibleAccount = accountsTableData.Where(account => account.username == this.state.typedInUsername && 
            account.password == this.state.typedInPassword).FirstOrDefault();
        return Promise.resolve(possibleAccount);
    } 
    //Depending on the result of the CheckLoginInDatabase method, an pop up appears on the screen
    ResultLogin(event: any){
        event.preventDefault();
        this.CheckLoginInDatabase().then(possibleAccount => possibleAccount==null? alert("Incorrect login") : alert("Successfull login!"));
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
            {this.state.isRegisterButtonClick?
             <Redirect to={"/Registratie"} push={true}/>
    
            :
            <div> </div>
 
            }
          
            </div>
        )}
}
export default LoginContainer;