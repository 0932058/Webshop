import * as React from 'react';
import {List} from "linqts";
import {account} from "../DatabaseSimulation/TableTypes";
import {accountsTableData} from "../DatabaseSimulation/FakeDatabase";
import { RouteComponentProps } from 'react-router';

//Registratie container

interface RegistratieContainerState{
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;

}
export class RegistratieContainer extends React.Component<RouteComponentProps<{}>, RegistratieContainerState> {
    constructor(){
        super();
        this.HandleChange = this.HandleChange.bind(this);
        this.InsertUserIntoDatabase = this.InsertUserIntoDatabase.bind(this);
        this.state = {firstname: "", lastname: "", email: "", username:"", password:""}       
    }
    HandleChange(event: any){     
        switch(event.target.name){
            case("firstname"):
                this.setState({firstname: event.target.value});    
                break;
            case("lastname"):
                this.setState({lastname: event.target.value});  
                break;
            case("email"):
                this.setState({email: event.target.value});  
                break;
            case("username"):
                this.setState({username: event.target.value});  
                break;
            case("password"):
                this.setState({password: event.target.value});  
                break;
            default:
                break;
        }           
    }
    InsertUserIntoDatabase(event: any){
        event.preventDefault();
        var possibleExistingAccount = accountsTableData.Where(account => account.username == this.state.username || 
        account.email == this.state.email).FirstOrDefault();
        if(possibleExistingAccount == null){
            var accountToInsert: account;
            accountToInsert = {pk: accountsTableData.Count() + 1, firstName: this.state.firstname,         
                lastName: this.state.lastname, email: this.state.email, username: this.state.username, password: this.state.password,
                wishListFK: null, shoppingCartFK: null, orderFK: null}  
                a 
        }
        else{
            alert("There is already a user registred with that username or email!");
        }
    }
    render(){
   
        return(
            <div className={"RegistratieContainer"}>
            <div> <h1> Registreer</h1> </div>
            <form  onSubmit={this.InsertUserIntoDatabase} onChange={this.HandleChange}>
            <div>
            <label>
                Firstname:         
                <input type="text" name="firstname" value={this.state.firstname} />               
            </label>
            </div>
            <div>
            <label>
                Lastname:       
                <input type="text" name="lastname"  value={this.state.lastname} />             
            </label>
            </div>
            <div>
            <label>
                Email:          | 
                <input type="text" name="email"  value={this.state.email} />             
            </label>
            </div>
            <div>
            <label>
                Username:       
                <input type="text" name="username"  value={this.state.username} />             
            </label>
            </div>
            <div>
            <label>
                Password:       
                <input type="text" name="password"  value={this.state.password} />             
            </label>
            <div>
            </div>
            </div>
            <input type="submit" value="Submit"  />
            </form>       
            <div>            
            </div>            
            </div>
        )}
}
export default RegistratieContainer;