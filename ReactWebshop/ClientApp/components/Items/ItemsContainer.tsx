import * as React from 'react';
import { List } from "linqts";
import { ProductPage } from "../ProductPage/ProductPageContainer";
import { RouteComponentProps } from 'react-router';
import { User } from "../User/User";
import { Link, NavLink } from 'react-router-dom';
import { Product } from 'ClientApp/components/Items/ItemsInterfaces';

interface ItemsContainerState{
    loaded : boolean;
    items : Product[] | null; //The products get put in the list by date
    currentSearch : string;
}
export class ItemsContainer extends React.Component<RouteComponentProps<{}>, ItemsContainerState> {
    months : string[];

    constructor(props){
        super(props);

        this.getItems = this.getItems.bind(this);
        this.putNewItem = this.putNewItem.bind(this);

        this.months = ["Januari", "Februari", "Maart", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ],

        this.state = {
            loaded : false,
            items : null,
            currentSearch : "",
        };
    }

    componentDidMount(){
        this.getItems();
    }

    getItems(){
        //this determines what needs to be loaded, according to the pathname of the route
        var api = '';
        if ( this.props.location.pathname === '/'){
            api = 'api/Items/Home';
        }else{
            api = 'api/Items' + this.props.location.pathname
            console.log('api/Items' + this.props.location.pathname)
        }


        fetch(api)
        .then(response => response.json() as Promise<Product[]>)
        .then(data => {
            this.setState({ items : data, loaded : true});
            console.log(data[0])
        }).catch(
            error => {
                this.setState({ loaded : false })
            }
        )
    }

    putNewItem(){
        fetch('api/Items/Post', {method: 'POST', headers : new Headers({'content-type' : 'application/json'})});
        this.getItems();
    }

    render(){

        const ZijFilter =(
            <div className="panel panel">
                <div className="panel-heading">
                    <h4 className="panel-title">
                        <a data-toggle="collapse" href="#collapse4">Zoek resultaten verfijnen</a>
                    </h4>
                </div>
                <div id="collapse4" className="collapse in">

                <div className="panel panel-default">
                        <div data-toggle="collapse" href="#collapsePrijs" className="panel-heading">
                            <h4  className="panel-title">
                                <a data-toggle="collapse" href="#collapsePrijs" >Prijs</a>
                            </h4>
                        </div>
                        <div id="collapsePrijs" className="panel-collapse collapse">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/>0-20
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/>20-40
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/>40-60
                                </label>
                            </div>
                            </div>
                            </div>


                    <div className="panel panel-default">
                        <div data-toggle="collapse" href="#collapse2" className="panel-heading">
                            <h4  className="panel-title">
                                <a data-toggle="collapse" href="#collapse2" >Console</a>
                            </h4>
                        </div>
                        <div id="collapse2" className="panel-collapse collapse">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Playstation3"/>Playstation 3
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Playstation4"/>Playstation 4
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Xbox360"/>Xbox 360
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="XboxOne"/>Xbox One
                                </label>
                            </div>
                        </div>
                    </div>
        
                    <div className="panel panel-default">
                        <div data-toggle="collapse" href="#collapse1" className="panel-heading">
                            <h4  className="panel-title">
                                <a data-toggle="collapse" href="#collapse1">Uitgevers</a>
                            </h4>
                        </div>
                        <div id="collapse1" className="panel-collapse collapse">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Bethesda"/>Bethesda
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Activision"/>Activision
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="EA_sports"/>EA Sports
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Microsoft"/>Microsoft
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sony"/>Sony
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Realtime Worlds"/>Realtime Worlds
                                </label>
                                <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Electronic Arts"/>Electronic Arts
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Trion Worlds"/>Trion Worlds
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Disney Interactive Studios"/>Disney Interactive Entertainment
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Square"/>Square
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sony Computer Entertainment"/>Sony Computer Entertainment
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Rockstar Games"/>Rockstar Games
                                </label>
                                <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Microsoft Game Studios"/>Microsoft Game Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="THQ"/>THQ
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Konami"/>Konami
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sega"/>Sega
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Cloud Imperium Games"/>Cloud Imperium Games
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Warner Bros. Interactive Entertainment"/>Warner Bros
                                </label>
                                <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Ubisoft"/>Ubisoft
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Square Enix"/>Square Enix
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Blizzard Entertainment"/>Blizzard Entertainment
                                </label>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
                    <div className="panel panel-default">
                        <div data-toggle="collapse" href="#collapse3" className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" href="#collapse3">Ontwikkelaars</a>
                            </h4>
                        </div>
                        <div id="collapse3" className="panel-collapse collapse">
                        <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Bethesda"/>Bethesda
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Activision"/>Activision
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="EA_sports"/>EA Sports
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Microsoft"/>Microsoft
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sony"/>Sony
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Realtime Worlds"/>Realtime Worlds
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Beachhead Studios"/>Beachhead Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Crytek Frankfurt"/>Crytek Frankfurt
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sony Online Entertainment"/>Sony Online Entertainment
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="High Moon Studios"/>High Moon Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Trion Worlds"/>Trion Worlds
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Bungie"/>Bungie
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Avalanche Software"/>Avalanche Software
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Square"/>Square
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Polyphony Digital"/>Polyphony Digital
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Rockstar North"/>Rockstar North
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Ensemble Studios"/>Ensemble Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Quantic Dream"/>Quantic Dream
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Kaos Studios"/>Koas Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Team Bondi"/>Team Bondi
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Rockstar Studios"/>Rockstar Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Kojima Productions"/>Kojima Productions
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Rockstar San Diego"/>Rockstar San Diego
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sega AM2"/>Sega AM2
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Cloud Imperium Games"/>Cloud Imperium Games
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="BioWare"/>BioWare
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Funcom"/>Funcom
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Surreal Software"/>Surreal Sotfware
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Ubisoft Paris"/>Ubisoft Paris
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Crystal Dynamics"/>Crystal Dynamics
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Silicon Knights"/>Silicon Knights
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Ubisoft Montreal"/>Ubisoft Montreal
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Blizzard Entertainment"/>Blizzard Entertainment
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
   
        return(

            <div  className="container">
            {this.props.location.pathname.toString() === "/"?
            <div className='co-md-12'> <h1>Nieuwste producten van maand { this.months[new Date().getMonth()]}! </h1> </div> 

            :
            
            <div/>
            }
            <div className='container'>
                <div className='col-md-2'>
                    {ZijFilter}
                </div>
                <div className='col-md-1'>

            
            <div  className={"ItemsContainerScroll"}>
                {this.state.loaded? 

                    this.state.items.map(
                        
                        item => {

                            return (
                                <div className={"Component"}>
                                    <div className='container' id='maingame'>
                                        <div className='col-md-2'>
                                            <NavLink to={'/Item/'+ item.productId}><img className="img-responsive" src={ item.productImg }/></NavLink>
                                        </div>
                                        <div className='col-md-2'>
                                            <h2>{ item.productNaam } </h2>
                                            <p> Console: {item.consoleType} </p>
                                            <p> Prijs: {"€" + item.productPrijs } </p>
                                            <p> { item.aantalInVooraad + " " } in voorraad </p>
                                            <NavLink to={ '/Item/' + item.productId } exact activeClassName='Active'className='button_to_product'>
                                                <button className={"btn btn-primary"} > naar product </button>
                                            </NavLink>

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
            </div>


            </div>
            </div>  
        )}
}