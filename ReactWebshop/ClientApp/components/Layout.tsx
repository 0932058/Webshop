import * as React from 'react';
import 'bootstrap';
import { Route } from 'react-router-dom';
import { UserNotLoggedInMenu } from "./LoginAndLogout/UserNotLoggedInMenuLayout";
import { ZijMenu } from './ZijMenu';
import { SearchContainer } from "../components/Items/SearchContainer";
import { UserLoggedInMenu } from "./LoginAndLogout/UserLoggedInMenuLayout";
import { User } from "./User/User";
import { ItemPage } from "../components/ProductPage/ItemPage";
import { ItemsContainer } from "../components/Items/ItemsContainer";
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import {Klant} from "./../../TypescriptModels/Klant";
import {ReactInterval} from 'react-interval';

//The components used for the layout is in the render method
//The components are always displayed on screen

export interface LayoutProps {
    children?: React.ReactNode;
}

interface LayoutState {
    pages : React.ReactNode;
    foundProducts : Product[];
    search : string;
    loggedIn : boolean
}

export class Layout extends React.Component<LayoutProps, LayoutState> {

    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.CheckAlreadyLoggedIn = this.CheckAlreadyLoggedIn.bind(this);
        this.CreateLoggedInUser = this.CreateLoggedInUser.bind(this);
        this.GetUserFromApi = this.GetUserFromApi.bind(this);
        this.updateMenuState = this.updateMenuState.bind(this);

        this.correctDB = this.correctDB.bind(this);

        this.state = {
            pages : [],
            foundProducts : [],
            search : "",
            loggedIn : false,
        }

        fetch('api/Items/GetAllId')
        .then(response => response.json() as Promise<number[]>)
        .then(data => {
            var newList = [];

            for(var x = 0; x < 26; x++){
                newList[x] = this.props.children[x];
            }

            data.map( 
                id => {
                    newList[id] = (<Route path={"/Item/" + id}  component={ItemPage}/>);
                }
            );

            this.setState({
                pages : newList,
            })
        });
    }
    handleChange(event : any){
        var search = event.target.value

        this.setState({
            search,
        })
    }

    handleSubmit(event : any){

    }

    async GetUserFromApi() : Promise<Klant>{
        let apiLink = 'api/User/Get/' + User.getStorageId()
        let apiResponse = await fetch(apiLink, {method: 'get', credentials: 'include', headers: new Headers({'content-type' : 'application/json'})});
        let apiResponseJson = await apiResponse.json();
        return apiResponseJson;
    }

    CheckAlreadyLoggedIn(){
        this.GetUserFromApi()
        .then(foundUser => {
            this.CreateLoggedInUser(foundUser)
        })
    }
    //Fetches the data (Pk, name etc) of the logged in user 
    CreateLoggedInUser(userAccount: Klant){
        var loggedInUser = User.CreateUser();
        loggedInUser.SetAccount(userAccount);
        this.setState({loggedIn : true})
        
    }

    updateMenuState() : boolean{

        //loc no, user no
        if( User.getStorageId() === 0 && User.IsUserLoggedIn() === false )
        {
            this.setState({loggedIn : false})
            return false
        }
        // loc yes, user no
        if( User.getStorageId() !== 0 && User.IsUserLoggedIn() === false)
        {
            
            this.CheckAlreadyLoggedIn()

            
            if(User.IsUserLoggedIn()){
                
                return true
            }
            this.setState({loggedIn : false})
            
            return false
        }
        // loc yes, user yes,
        if( User.getStorageId() !== 0 && User.IsUserLoggedIn() ){
            if(User.getStorageId() === User.GetPK()){
                null
            }else{
                User.LogUserOut()
                this.CheckAlreadyLoggedIn()
            }
            User.IsUserLoggedIn()
            this.setState({loggedIn : true})
            return true
        }
        // loc no, user yes
        if( User.getStorageId() === 0 && User.IsUserLoggedIn() ){
            User.LogUserOut()
            this.setState({loggedIn : false})
            User.IsUserLoggedIn()
            return false
        } 
    }

    public render() {
const topBar = (
    <div className="Mainlink_Notlogged"> 
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <NavLink to={"/"} className="navbar-brand">Normies</NavLink>
                </div>
                    <ul className="nav navbar-nav">
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Consoles
                        <span className="caret"></span>
                            </a>
                    <ul className="dropdown-menu">
                        <li><NavLink to={"/Consoles/Xbox360"}>Xbox 360</NavLink></li>
                        <li><NavLink to={"/Consoles/XboxOne"}>Xbox One</NavLink></li>
                        <li><NavLink to={"/Consoles/Playstation3"}>Playstation 3</NavLink></li>
                        <li><NavLink to={"/Consoles/Playstation4"}>Playstation 4</NavLink></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">Games
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                    <li><NavLink to={"/Games/Action"}>Action</NavLink></li>
                    <li><NavLink to={"/Games/Shooter"}>Shooter</NavLink></li>
                    <li><NavLink to={"/Games/Fantasie"}>Fantasie</NavLink></li>
                    <li><NavLink to={"/Games/Sport"}>Sport</NavLink></li>
                    <li><NavLink to={"/Games/Sandbox"}>Sandbox</NavLink></li>
                    <li><NavLink to={"/Games/Fight"}>Fight</NavLink></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">Accessoires
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                    <li><NavLink to={"/Accessoires/Headset"} >Headsets</NavLink></li>
                    <li><NavLink to={"/Accessoires/Racewheel"}>Race-Wheels</NavLink></li>
                    </ul>
                </li>
                <form className="navbar-form navbar-left" action={"/Search/" + this.state.search} onSubmit={ this.handleSubmit }>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Zoek naar product" value={this.state.search} onChange={this.handleChange}/>
                  <div className="input-group-btn">
                      <button className={"btn btn-default"} type={"submit"}> 
                        <i className="glyphicon glyphicon-search"/> 
                      </button>
                  </div>
                </div>
              </form>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li><NavLink to={"/Winkelmand"}>Winkelmand <span className="badge">0</span> </NavLink></li>
                    <li><NavLink to={"/Registratie"}>Registreer</NavLink></li>
                    <li><NavLink to={"/Login"}><span className="glyphicon glyphicon-log-in"> </span>    Login</NavLink></li>
                </ul>
            </div>
        </nav>
        
    </div>
)
const topBarLoggedIn = (
    <div className="Mainlink_Logged"> 
        <nav className="navbar navbar-inverse">
            <div className="navbar-header">
                <NavLink to={"/"} className="navbar-brand" >Home</NavLink>
            </div>
            <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">Consoles
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                    <li><NavLink to={"/Consoles/Xbox360"}>Xbox 360</NavLink></li>
                    <li><NavLink to={"/Consoles/XboxOne"}>Xbox One</NavLink></li>
                    <li><NavLink to={"/Consoles/Playstation3"}>Playstation 3</NavLink></li>
                    <li><NavLink to={"/Consoles/Playstation4"}>Playstation 4</NavLink></li>
                </ul>
            </li>
            <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Games
                    <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                <li><NavLink to={"/Games/Action"}>Action</NavLink></li>
                <li><NavLink to={"/Games/Shooter"}>Shooter</NavLink></li>
                <li><NavLink to={"/Games/Fantasie"}>Fantasie</NavLink></li>
                <li><NavLink to={"/Games/Sport"}>Sport</NavLink></li>
                <li><NavLink to={"/Games/Sandbox"}>Sandbox</NavLink></li>
                <li><NavLink to={"/Games/Fight"}>Fight</NavLink></li>
                </ul>
            </li>
            <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Accessoires
                    <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                <li><NavLink to={"/Accessoires/Headsets"} >Headsets</NavLink></li>
                <li><NavLink to={"/Accessoires/Racewheels"}>Race-Wheels</NavLink></li>
                </ul>
            </li>


            <form className="navbar-form navbar-left" onSubmit={ this.handleSubmit }>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Zoek naar product" value={this.state.search} onChange={this.handleChange}/>
                  <div className="input-group-btn">
                    <button className={"btn btn-default"} type={"submit"}> 
                        <i className="glyphicon glyphicon-search"/> 
                    </button>
                  </div>
                </div>
              </form>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li><NavLink to="/Winkelmand">Winkelmand <span className="badge">0</span> </NavLink></li>
                    <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">Profiel
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                    <li><NavLink to={"/Profile/Gegevens"} >Gegevens</NavLink></li>
                    <li><NavLink to={"/Wenslijst"}>Wenslijst</NavLink></li>
                    <li><NavLink to={"/Bestellingen"}>Bestellingen</NavLink></li>
                    </ul>
                </li>
                    <li><NavLink to="/Logout"><span className="glyphicon glyphicon-log-out"> </span>    Log uit</NavLink></li>    
                </ul>
            </div>
        </nav>
    </div>
)
/*const ZijMenu = (
    <nav className="Zijbalk">
        <div className="panel-group">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">
                        <a data-toggle="collapse" href="#collapse1">Consoles</a>
                    </h4>
                </div>
                <div id="collapse1" className="panel-collapse collapse ">
                    <div className="panel-body"><a href="/Consoles/Xbox360">Xbox 360</a></div>
                    <div className="panel-body"><a href="/Consoles/XboxOne">Xbox One</a></div>
                    <div className="panel-body"><a href="/Consoles/Playstation3">Playstation 3</a></div>
                    <div className="panel-body"><a href="/Consoles/Playstation4">Playstation 4</a></div>
                 </div>
            </div>
        </div>
        
        <div className="panel-group">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">
                        <a data-toggle="collapse" href="#collapse2">Games</a>
                    </h4>
                </div>
                <div id="collapse2" className="panel-collapse collapse in">
                    <div className="panel-body"><a href="/Games/Action">Action</a></div>
                    <div className="panel-body"><a href="/Games/Shooter">Shooter</a></div>
                    <div className="panel-body"><a href="/Games/Fantasie">Fantasie</a></div>
                    <div className="panel-body"><a href="/Games/Sport">Sport</a></div>
                    <div className="panel-body"><a href="/Games/Sandbox">Sandbox</a></div>
                    <div className="panel-body"><a href="/Games/Fight">Fight</a></div>
                 </div>
            </div>
        </div>

        <div className="panel-group">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">
                        <a data-toggle="collapse" href="#collapse3">Consoles</a>
                    </h4>
                </div>
                <div id="collapse3" className="panel-collapse collapse in">
                    <div className="panel-body" ><a href="/Accessoires/Headsets" >Headsets</a></div>
                    <div className="panel-body" ><a href="/Accessoires/Racewheels">Race-Wheels</a></div>
                 </div>
            </div>
        </div> 
    </nav>
)*/

        return <div className='homepage'>
        <div className='container'>
            <div className='col-md-12'> 
                
                <ReactInterval timeout={1000} enabled={true}
                    callback={() => this.updateMenuState()} />

                {
                    this.state.loggedIn?
                    topBarLoggedIn
                    :
                    topBar
                }

            </div>
        </div>
        <div className='container'>
                <div  className='col-md-5'>
                    { this.state.pages } 
                </div>
                <div className='col-md-7'></div>
        </div>

                
            </div>;
    }
}
