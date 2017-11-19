import * as React from 'react';
import {List} from "linqts";
import {user} from "../DatabaseSimulation/TableTypes";
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
        this.ConnectWithApiToCheckIfUserExist = this.ConnectWithApiToCheckIfUserExist.bind(this);
        this.PostUserToDatabase = this.PostUserToDatabase.bind(this);
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
    IsNoEmptyField() : boolean{
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
            return true;
        }
        else{
            return false;
        }
    }
    async ConnectWithApiToCheckIfUserExist() : Promise<user>{
        let apiUrl = 'api/User/Get/Username/' + this.state.username
        let apiResponse = await fetch(apiUrl, {method: 'get', credentials: 'include', headers: new Headers({'content-type' : 'application/json'})});
        let apiResponseJson = await apiResponse.json();
        return apiResponseJson;
    }
    CheckIfAccountExists(event: any){  
        event.preventDefault();

        this.IsNoEmptyField() ? 

        this.ConnectWithApiToCheckIfUserExist()
        .then(_ => alert("Username already exists"))
        .catch(_ =>{
            this.PostUserToDatabase();
        })

        :   
        alert("There are  empty fields left!")
    }
    //Based on the filled in information that the user gave, they are send to the api
    async PostUserToDatabase(){
        let apiUrl = 'api/User/Post'
        let userToPost: user = {pk: 0, firstName: this.state.firstname, lastName: this.state.lastname, streetname:this.state.streetname,
        postcode: this.state.postcode, email: this.state.email, username: this.state.username, password: this.state.password, wishListFK: 0, 
        shoppingCartFK: 0,   orderFK: 0}
        let apiResponse = await fetch(apiUrl, {method: 'POST', body:JSON.stringify(userToPost), headers: new Headers({'content-type' : 'application/json'})});
        this.setState({isNoEmptyInputFields: true})
    }
    render(){
        return(
            <div className={"Container"}>
                <h1> Registreer</h1>

                <ul><form  onSubmit={this.CheckIfAccountExists } onChange={this.HandleInputFieldsChange}>
                
                    <li><input placeholder="voornaam" type="text" name="firstname" value={this.state.firstname} /> </li>              
                   
                    <li><input placeholder="achternaam" type="text" name="lastname"  value={this.state.lastname} /> </li>            

                    <li><input placeholder="email" type="text" name="email"  value={this.state.email} /> </li>            
                
                    <li><input placeholder="gebruikersnaam" type="text" name="username"  value={this.state.username} /> </li>            
                  
                    <li><input placeholder="wachtwoord" type="text" name="password"  value={this.state.password} /> </li>            
                 
                    <li><input placeholder='straatnaam' type="text" name="streetname"  value={this.state.streetname} /> </li>            
                  
                    <li><input placeholder="postcode" type="text" name="postcode"  value={this.state.postcode} /> </li>            

                    <li><input placeholder="Registreer" type="submit" value="Registreer"  /> </li>
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