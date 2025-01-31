import * as React from 'react';
import {Klant} from "../../../TypescriptModels/Klant"
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router';

interface RegistratieContainerState{
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    username: string;
    password: string;
    streetname: string;
    streetnumber: string,
    klantPlaats: string,
    tussenvoegsel: string

    numberaddition: string,
    postcode: string;
    isNoEmptyInputFields: boolean;
}
export class RegistratieContainer extends React.Component<RouteComponentProps<{}>, RegistratieContainerState> {
    constructor(){
        super();
        this.CheckIfAccountExists = this.CheckIfAccountExists.bind(this);
        this.ConnectWithApiToCheckIfUserExist = this.ConnectWithApiToCheckIfUserExist.bind(this);
        this.PostUserToDatabase = this.PostUserToDatabase.bind(this);
        this.state = {firstname: "", lastname: "", email: "", phonenumber: "", username:"", password:"", streetname: "", postcode:"", streetnumber: "", numberaddition: "", klantPlaats: "", tussenvoegsel: "", isNoEmptyInputFields:false}       
    }
    async ConnectWithApiToCheckIfUserExist() : Promise<Klant>{
        let apiUrl = 'api/User/Get/Username/' + this.state.username
        let apiResponse = await fetch(apiUrl, {method: 'get', credentials: 'include', headers: new Headers({'content-type' : 'application/json'})});
        let apiResponseJson = await apiResponse.json();
        return apiResponseJson;
    }
    CheckIfAccountExists(event: any){  
    event.preventDefault();
    this.ConnectWithApiToCheckIfUserExist()
        .then(_ => alert("Username already exists!"))
        .catch(_ =>{
            this.PostUserToDatabase();     
        })     
    }
    //Based on the filled in information that the user gave, they are send to the api
    async PostUserToDatabase(){
        let apiUrl = 'api/User/Post'
        let userToPost: Klant = {
            KlantId: 0, 
            klantNaam: this.state.firstname, 
            klantAchternaam: this.state.lastname,
            klantTussenvoegsel: this.state.tussenvoegsel, 
            klantTel: parseInt(this.state.phonenumber),
            klantMail: this.state.email,
            klantStraat: this.state.streetname, 
            klantPostcode: this.state.postcode, 
            klantStraatnmr: this.state.streetnumber,
            username: this.state.username,
            password: this.state.password,
            klantPlaats: this.state.klantPlaats,
            klantRegistratieDatum: new Date()
        }
        let apiResponse = await fetch(apiUrl, {method: 'POST', body:JSON.stringify(userToPost), headers: new Headers({'content-type' : 'application/json'})});
        this.setState({isNoEmptyInputFields: true})
    }
    render(){
        return(
            <div className={"Container"}>
                <div className="col-md-offset-5"><h1>Registreer</h1></div>
                    <form action="/action_page.php"  onSubmit={this.CheckIfAccountExists } >
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <p>Voornaam*</p>
                            <input placeholder="voornaam" pattern="[a-zA-Z /s]{1,15}" title="voornaam moet bestaan uit 1 tot en met 15 letters"
                            type="text" name="firstname" className="form-control" value={this.state.firstname} required={true}
                            onChange={(e:any) => this.setState({firstname: e.target.value})}/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <p>Achternaam*</p>
                            <input placeholder="achternaam" pattern="[a-zA-Z /s]{1,30}" title="achternaam moet bestaan uit 1 tot 30 letters" 
                            type="text" name="lastname" className="form-control"  value={this.state.lastname} required={true}
                            onChange={(e:any) => this.setState({lastname: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <p>Tussenvoegsel</p>
                            <input placeholder="tussenvoegsel" pattern="[a-zA-Z /s]{1,15}" title="tussenvoegsel moet bestaan uit 1 tot en met 15 letters"
                            type="text" name="tussenvoegsel" className="form-control" value={this.state.tussenvoegsel} 
                            onChange={(e:any) => this.setState({tussenvoegsel: e.target.value})}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                        <p>Email*</p>
                        <input placeholder="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,3}$" 
                        title='zorg dat het een juist email is vb. characters@characters.domain'
                        type="text" name="email"className="form-control"  value={this.state.email}  required={true}
                        onChange={(e:any) => this.setState({email: e.target.value})}
                        />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                        <p>Telefoonnummer*</p>
                        <input placeholder="telefoonnummer" pattern="[0-9]{1,30}"
                        title="Telefoonnummer moet alleen uit cijfers bestaan"
                        type="tel" name="phonenumber" className="form-control" required={true}
                        onChange={(e:any) => this.setState({phonenumber: e.target.value})}
                         />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                        <p>Gebruikersnaam*</p>
                        <input placeholder="gebruikersnaam" pattern="[a-zA-Z0-9]{3,16}" title="gebruikersnaam moet minimaal 3 en maximaal 16 tekens bestaan"
                        type="text" name="username"className="form-control"  value={this.state.username}  required={true}
                        onChange={(e:any) => this.setState({username: e.target.value})}
                         />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                        <p>Wachtwoord*</p>
                        <input placeholder="wachtwoord" pattern=".{6,}"  title="wachtwoord moet minstens 6 waardes bevatten"
                        type="password" name="password"className="form-control"  value={this.state.password}  required={true}
                        onChange={(e:any) => this.setState({password: e.target.value})}
                         /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                        <p>Herhaal Wachtwoord*</p>
                        <input placeholder="herhaal wachtwoord" pattern={"(" + this.state.password + ")"}  title="moet hetzelfde zijn als wachtwoord"
                        type="password" name="herhaal wachtwoord" className="form-control"  required={true}
                         /> 
                        </div>
                    </div>
                    <div className="row">    
                        <div className="col-md-4 col-md-offset-4"> 
                            <p>Straatnaam*</p>
                            <input placeholder='straatnaam' pattern="[a-zA-Z /s]{2,30}" title="vul een juist adres in"
                            type="text" name="streetname"className="form-control"  value={this.state.streetname}  required={true}
                            onChange={(e:any) => this.setState({streetname: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2 col-md-offset-4">
                            <p>Straatnummer*</p>
                            <input placeholder='straatnummer' pattern="[0-9]{0,5}" title="vul een geldige huisnummer in"
                            type="text" name="streetnumber"className="form-control"  value={this.state.streetnumber}  required={true}
                            onChange={(e:any) => this.setState({streetnumber: e.target.value})}
                            />
                        </div>  
                        <div className="col-md-2">
                            <p>Toevoeging</p>
                            <input placeholder='Toevoeging' pattern="[a-zA-Z]{1}"
                            type="text" name="nummertoevoeging"className="form-control"  value={this.state.numberaddition}
                            onChange={(e:any) => this.setState({numberaddition: e.target.value})}
                            />
                        </div> 
                    </div>        
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                        <p>Postcode*</p>
                        <input placeholder="postcode" pattern="[1-9][0-9]{3}\s?[a-zA-Z]{2}" title="postcode moet uit 4 cijfers en 2 letters bestaan" 
                        type="text" name="postcode"className="form-control"  value={this.state.postcode}  required={true}
                        onChange={(e:any) => this.setState({postcode: e.target.value})}
                         />
                        </div>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                        <p>Plaats*</p>
                        <input placeholder='plaatsnaam' pattern="[a-zA-Z /s]{2,30}" title="vul een juist plaats in"
                        type="text" name="postcode"className="form-control"  value={this.state.klantPlaats}  required={true}
                        onChange={(e:any) => this.setState({klantPlaats: e.target.value})}
                         />
                        </div>
                    </div>
                    
                    </div>
                    <div className="col-md-offset-4">
                    <h6>
                        <strong>Velden met * zijn verplicht!</strong>
                    </h6>
                    </div>
                    <button className="btn btn-primary col-md-offset-4" placeholder="Registreer" type="submit" value="Registreer">    
                        Registreer  
                    </button>
                </form>


            {this.state.isNoEmptyInputFields ?
            <Redirect to={"/Registratiesuccessfull"} push={true}/>
            :
            null
            }                  
            </div>
        )}
}
export default RegistratieContainer;