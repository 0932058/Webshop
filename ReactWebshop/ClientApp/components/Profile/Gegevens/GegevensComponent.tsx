import * as React from 'react';
import {List} from "linqts";
import { RouteComponentProps } from 'react-router';
import {RegistratieContainer} from "../../Registratie/RegistratieContainer";
import { Redirect } from 'react-router';
import {User} from "../../User/User";

interface GegevensState{
    email: string,
    straatNaam: string,
    straatNummer: string,
    postcode: string,
    plaats: string,
    isGegevensWijzigenClicked: boolean
}

export class GegevensComponent extends React.Component<{}, GegevensState> {
    constructor(props: User){
        super();      
        this.ProcessEditedUser = this.ProcessEditedUser.bind(this);
        this.state = {email: User.GetEmail(), straatNaam: User.GetStreetname(),
        postcode: User.getPostcode(), straatNummer: User.GetStreetnumber(), plaats: User.GetPlaats(), isGegevensWijzigenClicked: false}

    }
    async ProcessEditedUser(){
        var klantToEdit: any = {
            pk: User.GetPK(),
            email: this.state.email,
            straatNaam: this.state.straatNaam,
            straatNummer: this.state.straatNummer,
            postcode: this.state.postcode,
            plaats: this.state.plaats,
        }
        let apiResponse = await fetch("api/User", {method: "PUT", body:JSON.stringify(klantToEdit), headers: new Headers({'content-type' : 'application/json'})});
        this.setState({isGegevensWijzigenClicked: true})
        
    }
    render(){  
        return(
            <div className={"GegevensComponent"}>
            
            <h1> Gegevens </h1>
            <p><b> Username: </b>{User.GetUsername()} </p>
            <p><b> Voornaam: </b>{User.GetFirstname()} </p>
            <p><b> Achternaam: </b>{User.GetLastname()} </p>
            <p><b> Email: </b>{User.GetEmail()} </p>           
            <p><b> Straat: </b>{User.GetStreetname()} {User.GetStreetnumber()} </p>
            <p><b> Postcode: </b>{User.getPostcode()} </p>
            <button onClick={() => this.setState({isGegevensWijzigenClicked: true})}> Gegevens Wijzigen </button>
            
            {this.state.isGegevensWijzigenClicked?
            <div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                    <p>Email</p>
                    <input placeholder="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,3}$" 
                    title='zorg dat het een juist email is vb. characters@characters.domain'
                    type="text" name="email"className="form-control"  value={this.state.email}  required={true}
                    onChange={(e:any) => this.setState({email: e.target.value})}
                    />
                    </div>
                </div>
                <div className="row">    
                    <div className="col-md-4 col-md-offset-4"> 
                        <p>Straatnaam</p>
                        <input placeholder='straatnaam' pattern="[a-zA-Z /s]{2,30}" title="vul een juist adres in"
                        type="text" name="streetname"className="form-control"  value={this.state.straatNaam}  required={true}
                        onChange={(e:any) => this.setState({straatNaam: e.target.value})}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 col-md-offset-4">
                        <p>Straatnummer</p>
                        <input placeholder='straatnummer' pattern="[0-9]{0,5}" title="vul een geldige huisnummer in"
                        type="text" name="streetnumber"className="form-control"  value={this.state.straatNummer}  required={true}
                        onChange={(e:any) => this.setState({straatNummer: e.target.value})}
                        />
                    </div>      
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                    <p>Postcode</p>
                    <input placeholder="postcode" pattern="[1-9][0-9]{3}\s?[a-zA-Z]{2}" title="postcode moet uit 4 cijfers en 2 letters bestaan" 
                    type="text" name="postcode"className="form-control"  value={this.state.postcode}  required={true}
                    onChange={(e:any) => this.setState({postcode: e.target.value})}
                        />
                    </div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                    <p>Plaats</p>
                    <input placeholder='plaatsnaam' pattern="[a-zA-Z /s]{2,30}" title="vul een juist plaats in"
                    type="text" name="postcode"className="form-control"  value={this.state.plaats}  required={true}
                    onChange={(e:any) => this.setState({plaats: e.target.value})}
                        />
                    </div>
                </div>    
                
                <div> </div>
                <button onClick={() => this.ProcessEditedUser()}> Wijzig </button>
        
                </div>
                </div>
                </div>
                :
            
                <div> </div>
            }
                    
                 
        </div>
    )
    }     
}
export default GegevensComponent;