import * as React from 'react';
import {List} from "linqts";
import { RouteComponentProps } from 'react-router';
import {RegistratieContainer} from "../Registratie/RegistratieContainer";
import { Redirect } from 'react-router';
import {User} from "../User/User";
import {Klant} from "../../../TypescriptModels/Klant";

interface LoginContainerState{
    //to check if it needs to redirect to Home, there is a method in User class to check the login status
    userLoggedIn: boolean; 
    typedInUsername: string;
    typedInPassword: string;
    isRegisterButtonClick: boolean;
    loggedInUser: null;
}
export class LoginContainer extends React.Component<RouteComponentProps<{}>, LoginContainerState> {
    constructor(){
        super();
        this.HandleChangeToInputFields = this.HandleChangeToInputFields.bind(this);
        this.GetUserFromApi = this.GetUserFromApi.bind(this);
        this.CheckIfLoginIsCorrect = this.CheckIfLoginIsCorrect.bind(this);
        this.RegisterTheAccount = this.RegisterTheAccount.bind(this);
        this.state = {typedInUsername:"", typedInPassword:"", isRegisterButtonClick: false, userLoggedIn: false, loggedInUser: null}   
        this.CreateLoggedInUser = this.CreateLoggedInUser.bind(this);   
        this.getDotAmount = this.getDotAmount.bind(this); 
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
    async GetUserFromApi() : Promise<Klant>{
        let apiLink = 'api/User/Get/Username/' + this.state.typedInUsername
        let apiResponse = await fetch(apiLink, {method: 'get', credentials: 'include', headers: new Headers({'content-type' : 'application/json'})});
        let apiResponseJson = await apiResponse.json();
        return apiResponseJson;
    }
    CheckIfLoginIsCorrect(event:any):void{
        event.preventDefault();
        this.GetUserFromApi()
        .then(foundUser => {
            if(foundUser.password == this.state.typedInPassword){
                this.CreateLoggedInUser(foundUser);
            }
            else{
                alert("Wrong password!")
            }
        })
        .catch(_ => alert("Username does not exist!"))
    }
    //Fetches the data (Pk, name etc) of the logged in user 
    CreateLoggedInUser(userAccount: Klant){
        var loggedInUser = User.CreateUser();
        loggedInUser.SetAccount(userAccount);
        localStorage.setItem("currentklant", userAccount.klantId.toString())
        this.setState({userLoggedIn: true})
    }
    //When the user clicks the register button
    RegisterTheAccount(){
        this.setState({isRegisterButtonClick: true})
    }

    getDotAmount(){
        let retStr = "";
        for(var x; x < this.RegisterTheAccount.length; x++){
            retStr += "*"
        }
    }

    render(){
        return(
            <div className={"Container"}>
            
            <div> <h1> Log in </h1> </div>

            <form  onSubmit={this.CheckIfLoginIsCorrect} onChange={this.HandleChangeToInputFields}>
                <div className="input-group">
                    <span className="input-group-addon"> <i className="glyphicon glyphicon-user"> </i> </span> 
                    <input type="text" name="username" value={this.state.typedInUsername} />
                </div>

                <div className="input-group"> 
                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                    <input type="text" name="password"  value={this.state.typedInPassword} />       
                </div>

                <div className="input-group">
                    <input className="btn" type="submit" value="Inloggen"  />
                </div>

                <button className="btn-primary" onClick={() => this.getDotAmount()}> Registeer </button>
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
                    
            </div>
        )}
}
export default LoginContainer;