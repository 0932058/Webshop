import * as React from 'react';
import {List} from "linqts";
import {Klant} from "../../../TypescriptModels/Klant"
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
    async ConnectWithApiToCheckIfUserExist() : Promise<Klant>{
        let apiUrl = 'api/User/Get/Username/' + this.state.username
        let apiResponse = await fetch(apiUrl, {method: 'get', credentials: 'include', headers: new Headers({'content-type' : 'application/json'})});
        let apiResponseJson = await apiResponse.json();
        return apiResponseJson;
    }
    CheckIfAccountExists(event: any){  
        event.preventDefault();

        this.IsNoEmptyField() ? 

        this.ConnectWithApiToCheckIfUserExist()
        .then(_ => alert("Username already exists!"))
        .catch(_ =>{
            this.PostUserToDatabase();
        })

        :   
        alert("There are  empty fields left!")
    }
    //Based on the filled in information that the user gave, they are send to the api
    async PostUserToDatabase(){
        let apiUrl = 'api/User/Post'
        let userToPost: Klant = {
            KlantId: 0, 
            klantNaam: this.state.firstname, 
            klantAchternaam: this.state.lastname,
            klantTussenvoegsel: this.state.firstname, 
            klantTel: 150,
            klantMail: this.state.email,
            klantStraat: this.state.streetname, 
            klantPostcode: this.state.postcode, 
            klantStraatnmr:"116",
            username: this.state.username,
            password: this.state.password}
        let apiResponse = await fetch(apiUrl, {method: 'POST', body:JSON.stringify(userToPost), headers: new Headers({'content-type' : 'application/json'})});
        this.setState({isNoEmptyInputFields: true})
    }
    render(){
        return(
            <div className={"Container"}>
                <h1> Registreer</h1>

                <ul className='reg_ul'><form action="/action_page.php"  onSubmit={this.CheckIfAccountExists } onChange={this.HandleInputFieldsChange}>
                
                    <li className='reg_li'>
                        <p>Voornaam</p>
                        <input placeholder="voornaam" pattern="[a-zA-Z]{1,15}" title="voornaam moet bestaan uit 1 tot en met 15 letters"
                        type="text" name="firstname" className="form-control" value={this.state.firstname} />
                    </li>              
                    <li className='reg_li'>
                        <p>Achternaam</p>
                        <input placeholder="achternaam" pattern="[a-zA-Z]{1,30}" title="achternaam moet bestaan uit 1 tot 30 letters" 
                        type="text" name="lastname" className="form-control"  value={this.state.lastname} />
                    </li>            
                    <li className='reg_li'>
                        <p>Email</p>
                        <input placeholder="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[.]+[a-z]{2,3}$" 
                        title='zorg dat het een juist email is vb. characters@characters.domain'
                        type="text" name="email"className="form-control"  value={this.state.email} />
                    </li>            
                    <li className='reg_li'>
                        <p>Gebruikersnaam</p>
                        <input placeholder="gebruikersnaam" pattern="[a-zA-Z0-9]{3,15}" title="gebruikers naam mag maximaal uit 8 tekens bestaan"
                        type="text" name="username"className="form-control"  value={this.state.username} />
                    </li>            
                    <li className='reg_li'>
                        <p>Wachtwoord</p>
                        <input placeholder="wachtwoord" pattern=".{6,}"  title="wachtwoord moet minstens 6 waardes bevatten"
                        type="password" name="password"className="form-control"  value={this.state.password} /> 
                    </li>            
                    <li className='reg_li'>
                        <p>Straatnaam</p>
                        <input placeholder='straatnaam' pattern="([a-zA-Z]).{2,30}([0-9]).{0,3}" title="vul een juist adres in"
                        type="text" name="streetname"className="form-control"  value={this.state.streetname} />
                    </li>            
                    <li className='reg_li'>
                        <p>Postcode</p>
                        <input placeholder="postcode" pattern="([0-9]){4}([A-Z]){2}" title="postcode moet uit 4 cijfers en 2 letters bestaan" 
                        type="text" name="postcode"className="form-control"  value={this.state.postcode} />
                    </li>            
                    <li><input placeholder="Registreer" type="submit" value="Registreer"/> </li>
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