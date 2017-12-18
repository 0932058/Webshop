import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Klant } from '../../../TypescriptModels/Klant';

//When the profile gets clicked it gets redirected to this empty profile page

interface UsersState{
    users : Klant[];
    loaded : boolean ;
}

export class UsersPage extends React.Component<{}, UsersState> {
    constructor(){
        super();

        this.state = {
            users : [],
            loaded : false,
        }
        
        fetch("api/Admin/GetAllUsers")
        .then(response => response.json() as Promise<Klant[]>)
        .then(data => {
            this.setState({users : data, loaded : true});
            console.log(data[0])
        }).catch(
            error => {
                this.setState({ loaded : false })
            }
        )
    }

    render(){  
        return(         
            <div className={"UsersComponent"} > 

                <h1> Users </h1>

                {this.state.loaded? 

                    this.state.users.map(
                        
                        user => {

                            return (
                                <div className={"Component"}>
                                    <div className='container' id='maingame'>
                                        
                                        <div className='col-md-2'>
                                            
                                            <h2> { user.klantAchternaam } </h2>

                                            <p> { user.klantNaam } </p>

                                            <p> klant id: {" " + user.klantId } </p>

                                            <p>  gebruikersnaam : { " " + user.username } </p>

                                            <button className={"btn btn-primary"} > pas aan </button>

                                        </div>
                                    </div>
                                </div> 
                            )
                        }
                    )
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

            </div>
        )
    }     
}