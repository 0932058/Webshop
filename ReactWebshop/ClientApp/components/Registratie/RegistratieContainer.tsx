import * as React from 'react';
import {List} from "linqts";
import {account} from "../DatabaseSimulation/TableTypes";
import {accountsTableData} from "../DatabaseSimulation/FakeDatabase";
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router';

interface RegistratieContainerState{
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    streetname: string;
    postcode: string;
    isNoEmptyInputFields: boolean;
}
export class RegistratieContainer extends React.Component<RouteComponentProps<{}>, RegistratieContainerState> {
    constructor(){
        super();
        this.HandleInputFieldsChange = this.HandleInputFieldsChange.bind(this);
        this.CheckIfAccountExists = this.CheckIfAccountExists.bind(this);
        this.InsertAccountIntoDatabase = this.InsertAccountIntoDatabase.bind(this);
        this.state = {firstname: "", lastname: "", email: "", username:"", password:"", streetname: "", postcode:"", isNoEmptyInputFields:false}       
    }
    //When an input field gets typed in this method gets called
    HandleInputFieldsChange(event: any){     
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
            case("streetname"):   
                this.setState({streetname: event.target.value});  
                break;
            case("postcode"):
                this.setState({postcode: event.target.value});  
                break;
            default:
                break;
        }           
    }
    //Check if there are no empty input fields
    IsNoEmptyField() : Promise<void>{
        var inputFields = new List<string>();
        inputFields.Add(this.state.firstname)
        inputFields.Add(this.state.lastname)
        inputFields.Add(this.state.password)
        inputFields.Add(this.state.username)
        inputFields.Add(this.state.email);
        inputFields.Add(this.state.streetname);
        inputFields.Add(this.state.postcode);
    
        var EmptyFieldCheckResult = inputFields.Where(input => input.length == 0)
        if(EmptyFieldCheckResult.Count() == 0){
            return Promise.resolve();
        }
        else{
            return Promise.reject("There is still an empty field left!");
        }
    }
    //If there are no empty fields and no duplicate username or email, then the account gets inserted into the database
    InsertAccountIntoDatabase(event :any){   
        event.preventDefault();
        this.IsNoEmptyField().then(() => this.CheckIfAccountExists().then(account => accountsTableData.Add(account))
        .then(() => this.setState({isNoEmptyInputFields: true}))
        .catch(userNameOrEmailError => alert(userNameOrEmailError)))
        .catch(emptyFieldError => alert(emptyFieldError))       
    }
    //Checks if account already exists
    CheckIfAccountExists() : Promise<account>{       
        var possibleExistingAccount = accountsTableData.Where(account => account.username == this.state.username || 
        account.email == this.state.email).FirstOrDefault();
        var accountToInsert: account;
            
        if(possibleExistingAccount == null){          
            accountToInsert = {pk: accountsTableData.Count() + 1, firstName: this.state.firstname,         
                lastName: this.state.lastname, email: this.state.email, username: this.state.username, password: this.state.password,
                wishListFK: null, shoppingCartFK: null, orderFK: null}    
                return Promise.resolve(accountToInsert);                 
        }
        else{
            Promise.reject("Username or email already exists!");     
        }  
    }
    render(){
        return(
            <div className={"Container"}>
                <h1> Registreer</h1>

                <ul><form  onSubmit={this.InsertAccountIntoDatabase} onChange={this.HandleInputFieldsChange}>
                    <li><input placeholder="firstname" type="text" name="firstname" value={this.state.firstname} /> </li>              
                   
                    <li><input placeholder="lastname" type="text" name="lastname"  value={this.state.lastname} /> </li>            

                    <li><input placeholder="email" type="text" name="email"  value={this.state.email} /> </li>            
                
                    <li><input placeholder="username" type="text" name="username"  value={this.state.username} /> </li>            
                  
                    <li><input placeholder="password" type="text" name="password"  value={this.state.password} /> </li>            
                 
                    <li><input placeholder='Straatnaam' type="text" name="streetname"  value={this.state.streetname} /> </li>            
                  
                    <li><input placeholder="postcode" type="text" name="postcode"  value={this.state.postcode} /> </li>            

                    <li><input placeholder="Submit" type="submit" value="Registreer"  /> </li>
                </form></ul>

            {this.state.isNoEmptyInputFields ?
            <Redirect to={"/Registratiesuccessfull"} push={true}/>
            :
            <div> </div>
            }                  
            </div>
        )}
}
export default RegistratieContainer;