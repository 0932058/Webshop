import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Klant } from '../../../TypescriptModels/Klant';
import { Product } from 'ClientApp/components/Items/ItemsInterfaces';
import {IAdmin} from "./AdminInterface";
import { ProductPage } from 'ClientApp/components/ProductPage/ProductPageContainer';
import { User } from 'ClientApp/components/User/User';
import 'bootstrap';
import { Redirect } from 'react-router';


//When the profile gets clicked it gets redirected to this empty profile page

interface UsersState{
    users : Klant[];
    loaded : boolean;
    change: number,
    page: number,
    createUserClicked: boolean;
    klantNaam:string,
    klantAchternaam: string,
    klantTussenvoegsel: string,
    klantTel: number,
    klantMail: string,
    klantStraat: string,
    klantPostcode: string,
    klantStraatnmr: string,
    klantPlaats: string,
    klantDatumRegistratie: string,
    username: string,
    password: string,
    editUserClicked: boolean,
    search :string,
    showModal: boolean,
}

export class UsersPage extends React.Component<{}, UsersState>{
    constructor(){
        super();
        this.EditEntity = this.EditEntity.bind(this);
        this.DeleteEntity = this.DeleteEntity.bind(this);
        this.CreateEntity = this.CreateEntity.bind(this);
        this.handleChangeSubmit = this.handleChangeSubmit.bind(this);
        this.GetAllUsers = this.GetAllUsers.bind(this);
        this.SearchForUser = this.SearchForUser.bind(this);
        this.GetSpecificUserApicall = this.GetSpecificUserApicall.bind(this);

        this.state = {
            users : [],
            loaded : false,
            change : 0,
            page: 20,
            createUserClicked: false,
            editUserClicked: false,

            klantNaam : "",
            klantAchternaam : "",
            klantTussenvoegsel : "",
            klantTel : 0,
            klantMail : "",
            klantStraat : "",
            klantPostcode : "",
            klantStraatnmr : "",
            username : "",
            password : "",
            klantPlaats: "",
            klantDatumRegistratie: "",

            search: "",
            showModal: false,
        }
        this.GetAllUsers();

    }
    GetAllUsers() {      
        let  res;
        fetch("api/Admin/GetAllUsers")
        .then(response => response.json() as Promise<Klant[]>)
        .then(data => {
            this.setState({users: data, loaded: true})
        }).catch(
            error => {
                this.setState({loaded: false});
            }
        )
    }
    GetSpecificUser(username: string){
        console.log(username + " USERNAME!")
        this.GetSpecificUserApicall(username)
        .then(res => this.setState({users: res}))
        .catch(_ => this.setState({users: []}))

        if(username == ""){
            this.GetAllUsers();
        }
        

    }
    async GetSpecificUserApicall(username: string){
        let apiresponse = await fetch("api/Admin/GetUser/" + username,{ method: 'Get', headers: new Headers({'content-type' : 'application/json'})});
        let responseCoverted = apiresponse.json();
        return responseCoverted;

    }

    EditEntity(entity: Product | Klant){
        let IsEntityOfUserType = (anEntity: any) : anEntity is Klant => {
            return anEntity;
        }
        if(IsEntityOfUserType(entity)){
            this.setState({
                change: entity.klantId,
                klantNaam: entity.klantNaam,
                klantAchternaam: entity.klantAchternaam,
                klantTussenvoegsel: entity.klantTussenvoegsel,
                klantTel: entity.klantTel,
                klantMail: entity.klantMail,
                klantStraat: entity.klantStraat,
                klantPostcode: entity.klantPostcode,
                klantStraatnmr: entity.klantStraatnmr,
                username: entity.username,
                password: entity.password,
                klantPlaats: entity.klantPlaats,
                klantDatumRegistratie: entity.klantRegistratieDatum.toString()
            })
        }
    }
    async DeleteEntity(entity: Product | Klant) {
        alert("Weet je zeker dat je de klant wilt verwijderd?")
        let IsEntityOfUserType = (anEntity: any) : anEntity is Klant => {
            return anEntity;
        }

        if(IsEntityOfUserType(entity)){
            console.log("true")
            var apiUrl = "api/User/" + entity.klantId
   
            let apiResponse = await fetch(apiUrl, {method: 'DELETE', headers: new Headers({'content-type' : 'application/json'})});
            alert("Klant verwijderd");
        }
        this.GetAllUsers();
    }

    CreateEntity() {
        this.setState({createUserClicked: true})
    }

    async handleChangeSubmit(event: any, createdUserClick: boolean) {
        event.preventDefault();
        console.log(this.state.klantNaam)
        console.log(this.state.klantAchternaam)
        console.log(this.state.klantTussenvoegsel)
        console.log(this.state.klantTel)
        console.log(this.state.klantStraat)
        console.log(this.state.klantPostcode)
        console.log(this.state.klantStraatnmr)
        console.log(this.state.username)
        console.log(this.state.password)
        console.log(this.state.klantPlaats)
        console.log(new Date())
        console.log(this.state.klantNaam)

  
        let apiUrl: string;
        let apiMethod: string;

        let klantToPost: Klant = {
            KlantId: this.state.change,
            klantNaam : this.state.klantNaam,
            klantAchternaam: this.state.klantAchternaam,
            klantTussenvoegsel : this.state.klantTussenvoegsel,
            klantTel : this.state.klantTel,
            klantMail : this.state.klantMail,
            klantStraat : this.state.klantStraat,
            klantPostcode : this.state.klantPostcode,
            klantStraatnmr : this.state.klantStraatnmr,
            username : this.state.username,
            password: this.state.password,
            klantPlaats: this.state.klantPlaats,
            klantRegistratieDatum: new Date()
        }
        if(createdUserClick == true){
            apiUrl = 'api/User/Post/'
            apiMethod = "POST"
        }
        else{
            apiUrl = "api/User/"
            apiMethod = "PUT"
            

        }
        console.log(klantToPost + "KLANT TO POST")
        console.log(apiMethod + "API METHOD")
        let apiResponse = await fetch(apiUrl, {method: apiMethod, body:JSON.stringify(klantToPost), headers: new Headers({'content-type' : 'application/json'})});
        // this.GetAllUsers();
        // alert("Gewijzigd");
        return(
        <Redirect to={"/"} push={true}/>
        )
        
    }
    SearchForUser(search: string) : void{
        var searchedUsers: Klant[] = [];
        this.state.users.forEach(user => {
            if(user.username == search){
                searchedUsers.push(user);
            }
        });
        this.setState({users: searchedUsers})
        
    }

    //TODO: Maak een nieuwe gebruiker aan
    render(){  
        return(         
            
            <div className={"UsersComponent"} > 
            <div className='col-md-8'>
                <h1> Users </h1>

                <input type="search" name="search" placeholder="Zoek een specifieke user"className="form-control" id="search" onChange={(e: any) => this.GetSpecificUser(e.target.value)} />  
                <h2> Nieuwe gebruiker </h2> 
                <button className={"btn btn-primary"} onClick={() => this.CreateEntity()} > Maak een nieuwe gebruiker aan </button>
                <h2> Gevonden gebruikers: {this.state.users.length} </h2> 
                {this.state.loaded? 

                    <div>
                    
                    {this.state.users.map(
                        
                        (user, index) => {

                            if( (this.state.page) >= index.valueOf() && ( (this.state.page) - 20) <= index.valueOf() ) {return (
                                <div className={"Component"}>
                                        
                                    
                                        <div className='col-md-7'>   
                                            <h4>klant id:{" " + user.klantId } </h4>
                                            <h4>Username: { user.username }  </h4>
                                            <h4>Achternaam: { user.klantNaam }  </h4>
                                            <h4>E-Mail: { user.klantMail }  </h4>
                                            

                                            <button type="button" className={"btn btn-primary"} data-toggle="collapse" data-target="#userForm"  onClick={() => this.EditEntity(user)} > Bekijk / Pas Aan </button>
                                            <button className={"btn btn-primary"} onClick={() => this.DeleteEntity(user)} > Verwijder </button>
                                            <br/>
                                            <br/>
                                            </div>
                                            { console.log(this.state.change) }
                                            {
                                                user.klantId === this.state.change || this.state.createUserClicked?
                                                
                                                    <div>
                                                        <form action="/action_page.php"
                                                          onSubmit={(this.state.createUserClicked? (event:any) => this.handleChangeSubmit(event, true) 
                                                            :
                                                        (event: any) => this.handleChangeSubmit(event, false))}>

                                                     <div id="userForm">
                                                        <div className='col-md-5'>
                                                                <p>Voornaam</p>
                                                                <input placeholder="Voornaam" pattern="[a-zA-Z /s]{1,15}" title="Naam moet bestaan uit 1 tot en met 15 letters"
                                                                type="text" className="form-control" value={this.state.klantNaam} required={true}
                                                                onChange={(event:any) => this.setState({klantNaam: event.target.value})}
                                                                 />

                                                                <p>Achternaam</p>
                                                                <input placeholder="Achternaam" pattern="[a-zA-Z /s]{1,30}" title="Achternaam moet bestaan uit 1 tot 30 letters" 
                                                                type="text" className="form-control"  value={this.state.klantAchternaam} required={true} 
                                                                onChange={(event:any) => this.setState({klantAchternaam: event.target.value})}
                                                                />

                                                                <p>Tussenvoegsel</p>
                                                                <input placeholder="Tussenvoegsel"
                                                                title='Tussenvoegsel mag alleen uit letters bestaan'
                                                                type="text" className="form-control" pattern="[a-z]{1,6}" value={this.state.klantTussenvoegsel} required={false} 
                                                                onChange={(event:any) => this.setState({klantTussenvoegsel: event.target.value})}
                                                                />

                                                                <p>Telefoonnummer</p>
                                                                <input placeholder="Telefoonnummer" pattern="[0-9]{1,30}" title="gebruikers naam mag maximaal uit 8 tekens bestaan"
                                                                type="text" className="form-control"  value={this.state.klantTel} required={true}
                                                                onChange={(event:any) => this.setState({klantTel: event.target.value})}
                                                                />

                                                                <p>Email adres</p>
                                                                <input placeholder="Email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,3}$" title="zorg dat het een juist email is vb. characters@characters.domain"
                                                                type="text" className="form-control"  value={this.state.klantMail} required={true} 
                                                                onChange={(event:any) => this.setState({klantMail: event.target.value})}
                                                                /> 

                                                                <p>Straatnaam</p>
                                                                <input placeholder='Straatnaam' pattern="[a-zA-Z /s]{2,30}" title="vul een juist adres in"
                                                                type="text" className="form-control"  value={this.state.klantStraat} required={true} 
                                                                onChange={(event:any) => this.setState({klantStraat: event.target.value})}
                                                                />

                                                                <p>Plaatsnaam</p>
                                                                <input placeholder="Plaatsnaam" pattern=".{6,}"  title="vul een geldige plaatsnaam in" 
                                                                type="text" className="form-control"  value={this.state.klantPlaats} required={true} 
                                                                onChange={(event:any) => this.setState({klantPlaats: event.target.value})} />


                                                                <p>Postcode</p>
                                                                <input placeholder='Postcode' pattern="[1-9][0-9]{3}\s?[a-zA-Z]{2}" title="vul een geldige postcode in"
                                                                type="text" className="form-control"  value={this.state.klantPostcode} required={true} 
                                                                onChange={(event:any) => this.setState({klantPostcode: event.target.value})}
                                                                />

                                                                <p>Straatnummer</p>
                                                                <input placeholder="Straatnummer" pattern="[0-9]{0,5}" title="vul een geldige straatnummer in" 
                                                                type="text" className="form-control"  value={this.state.klantStraatnmr} required={true} 
                                                                onChange={(event:any) => this.setState({klantStraatnmr: event.target.value})} />

                                                                <p>Gebruikersnaam</p>
                                                                <input placeholder="Gebruikersnaam" pattern="[a-zA-Z0-9]{3,15}"  title="username moet uit 4 cijfers en 2 letters bestaan" 
                                                                type="text" className="form-control"  value={this.state.username} required={true} 
                                                                onChange={(event:any) => this.setState({username: event.target.value})} />

                                                                <p>Wachtwoord</p>
                                                                <input placeholder="Wachtwoord" pattern=".{6,}"  title="klantStraatnmr moet uit 4 cijfers en 2 letters bestaan" 
                                                                type="password" className="form-control"  value={this.state.password} required={true} 
                                                                onChange={(event:any) => this.setState({password: event.target.value})} />
                                                                
                                                                <p>Datum registratie: { this.state.klantDatumRegistratie} </p>
                                                                
                                                            <input className="btn btn-primary" placeholder="Wijzigen" type="submit" value="Wijzigen"/>
                                                            </div>
                                                            </div>
                                                            </form>
                                                            </div>
                                                        :
                                                        null
                                                    }
                                                </div>
                                           
                                            
                                        )
                                    }
                                    }
                                )
                            }


                                <div className='col-md-10'> 
                                    <ul className="pagination">
                                    <li > <button className={"btn btn-default"} onClick={()=> this.setState({ page : this.state.page - 20 })} >{"<-"} vorige</button> </li>
                                        {
                                            this.state.users.map(
                                                (item, index) => {
                                                    if( index % 20 == 0 && index < (this.state.page + 100) && index > (this.state.page - 100) && index != 0 || (index + 1) === this.state.users.length){
                                                        return (
                                                            <li ><button className={"btn btn-primary"} onClick={() => this.setState({ page : index})}> {index / 20} </button></li>
                                                        )
                                                    }
                                                }
                                            )
                                        }
                                    <li > <button className={"btn btn-primary"} onClick={()=> this.setState({ page : this.state.page + 20 })} >volgende -></button> </li>
                                    </ul>
                                </div>

                                </div>
                                
                                :
                                <div className="sk-fading-circle">
                                    <div className="sk-circle1 sk-circle"></div>
                                    <div className="sk-circle2 sk-circle"></div>
                                    <div className="sk-circle3 sk-circle"></div>
                                    <div className="sk-circle4 sk-circle"></div>
                                    <div className="sk-circle5 sk-circle"></div>
                                    <div className="sk-circle6 sk-circle"></div>
                                    <div className="sk-circle7 sk-circle"></div>
                                    <div className="sk-circle8 sk-circle"></div>
                                    <div className="sk-circle9 sk-circle"></div>
                                    <div className="sk-circle10 sk-circle"></div>
                                    <div className="sk-circle11 sk-circle"></div>
                                    <div className="sk-circle12 sk-circle"></div>
                                </div>
                            }
            
                            <div>
                                
                            </div>
            
                        </div>
                        </div>
                    );
                }     
            }
        
    
