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
    filteredItems : Product[] | null,
    filters : string[],
}
export class ItemsContainer extends React.Component<RouteComponentProps<{}>, ItemsContainerState> {
    months : string[];

    constructor(props){
        super(props);

        this.getItems = this.getItems.bind(this);
        this.putNewItem = this.putNewItem.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
        this.filterItems = this.filterItems.bind(this);

        this.months = ["Januari", "Februari", "Maart", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ],

        this.state = {
            loaded : false,
            items : null,
            currentSearch : "",
            filteredItems : null,
            filters : [],
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
        }


        fetch(api)
        .then(response => response.json() as Promise<Product[]>)
        .then(data => {
            this.setState({ items : data, filteredItems : data, loaded : true});
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

    filterItems(){
        //we copy the items list
        let newFilteredList : Product[] = [];
        let correctFilter = 0;

        for(let product of this.state.items){
            correctFilter = 0;
            console.log(this.state.filters.length + " aantal filters")

            for(let filter of this.state.filters){
                
                let popProduct : boolean = false

                if(product.consoleType.includes(filter)){
                    popProduct = true
                }

                if(product.productUitgever.includes(filter)){
                    popProduct = true
                }

                if(product.productOntwikkelaar.includes(filter)){
                    popProduct = true
                }

                if(popProduct){
                    correctFilter++
                }  

                console.log(correctFilter + " " + this.state.filters.length)
                    
                if(correctFilter === this.state.filters.length){
                    console.log(product.productNaam + " in de nieuwe lijst")
                    newFilteredList.push(product);
                }   
            }
        }

        console.log("____")

        this.setState({
            filteredItems : newFilteredList
        })

    }

    selectFilter(event){
        //if the filter is already in the filter list, pop it out, if the filter list is empty, make the filtered items equal to items, we never change this.state.items
        let filters : string[] = this.state.filters
        let newfilters = [];
        let popOut = false;
        let popOutFilter = "";

        for(let filter of this.state.filters){
            if(filter === event.target.value){

                popOut = true;
                popOutFilter = filter;
            }
        }

        if(popOut){

            console.log(popOutFilter + " " + "eruit gegooid")
            
            filters.splice(filters.indexOf(popOutFilter), 1)

            this.setState({
                filters
            })

            this.filterItems()

            if(this.state.filters.length === 0){
                console.log("items zijn nu heel")
                this.setState({
                    filteredItems : this.state.items
                })
            }
            return;
        }
        

        console.log(event.target.value + " in de filter list")
        filters.push(event.target.value)

        this.setState({
            filters
        })
        this.filterItems()
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
                                    <input type="checkbox" value="Playstation3" onClick={this.selectFilter}/>Playstation 3
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Playstation4" onClick={this.selectFilter}/>Playstation 4
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Xbox360" onClick={this.selectFilter}/>Xbox 360
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="XboxOne" onClick={this.selectFilter}/>Xbox One
                                </label>
                            </div>
                        </div>
                    </div>
        
                    {this.props.location.pathname.toString().includes("Games")?
                    <div className="panel panel-default">
                        <div data-toggle="collapse" href="#collapse1" className="panel-heading">
                            <h4  className="panel-title">
                                <a data-toggle="collapse" href="#collapse1">Uitgevers</a>
                            </h4>
                        </div>
                        <div id="collapse1" className="panel-collapse collapse">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Bethesda" onClick={this.selectFilter}/>Bethesda
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Activision" onClick={this.selectFilter}/>Activision
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="EA_sports" onClick={this.selectFilter}/>EA Sports
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Microsoft" onClick={this.selectFilter}/>Microsoft
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sony" onClick={this.selectFilter}/>Sony
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Realtime Worlds" onClick={this.selectFilter}/>Realtime Worlds
                                </label>
                                <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Electronic Arts" onClick={this.selectFilter}/>Electronic Arts
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Trion Worlds" onClick={this.selectFilter}/>Trion Worlds
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Disney Interactive Studios" onClick={this.selectFilter}/>Disney Interactive Entertainment
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Square" onClick={this.selectFilter}/>Square
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sony Computer Entertainment" onClick={this.selectFilter}/>Sony Computer Entertainment
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Rockstar Games" onClick={this.selectFilter}/>Rockstar Games
                                </label>
                                <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Microsoft Game Studios" onClick={this.selectFilter}/>Microsoft Game Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="THQ" onClick={this.selectFilter}/>THQ
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Konami" onClick={this.selectFilter}/>Konami
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sega" onClick={this.selectFilter}/>Sega
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Cloud Imperium Games" onClick={this.selectFilter}/>Cloud Imperium Games
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Warner Bros. Interactive Entertainment" onClick={this.selectFilter}/>Warner Bros
                                </label>
                                <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Ubisoft" onClick={this.selectFilter}/>Ubisoft
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Square Enix" onClick={this.selectFilter}/>Square Enix
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Blizzard Entertainment" onClick={this.selectFilter}/>Blizzard Entertainment
                                </label>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
        :
        null}
                    {this.props.location.pathname.toString().includes("Games")?
                    <div className="panel panel-default">
                        <div data-toggle="collapse" href="#collapse3" className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" href="#collapse3">Ontwikkelaars</a>
                            </h4>
                        </div>
                        <div id="collapse3" className="panel-collapse collapse">
                        <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Bethesda" onClick={this.selectFilter}/>Bethesda
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Activision" onClick={this.selectFilter}/>Activision
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="EA_sports" onClick={this.selectFilter}/>EA Sports
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Microsoft" onClick={this.selectFilter}/>Microsoft
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sony" onClick={this.selectFilter}/>Sony
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Realtime Worlds" onClick={this.selectFilter}/>Realtime Worlds
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Beachhead Studios" onClick={this.selectFilter}/>Beachhead Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Crytek Frankfurt" onClick={this.selectFilter}/>Crytek Frankfurt
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sony Online Entertainment" onClick={this.selectFilter}/>Sony Online Entertainment
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="High Moon Studios" onClick={this.selectFilter}/>High Moon Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Trion Worlds" onClick={this.selectFilter}/>Trion Worlds
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Bungie" onClick={this.selectFilter}/>Bungie
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Avalanche Software" onClick={this.selectFilter}/>Avalanche Software
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Square" onClick={this.selectFilter}/>Square
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Polyphony Digital" onClick={this.selectFilter}/>Polyphony Digital
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Rockstar North" onClick={this.selectFilter}/>Rockstar North
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Ensemble Studios" onClick={this.selectFilter}/>Ensemble Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Quantic Dream" onClick={this.selectFilter}/>Quantic Dream
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Kaos Studios" onClick={this.selectFilter}/>Koas Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Team Bondi" onClick={this.selectFilter}/>Team Bondi
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Rockstar Studios" onClick={this.selectFilter}/>Rockstar Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Kojima Productions" onClick={this.selectFilter}/>Kojima Productions
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Rockstar San Diego" onClick={this.selectFilter}/>Rockstar San Diego
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sega AM2" onClick={this.selectFilter}/>Sega AM2
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Cloud Imperium Games" onClick={this.selectFilter}/>Cloud Imperium Games
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="BioWare" onClick={this.selectFilter}/>BioWare
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Funcom" onClick={this.selectFilter}/>Funcom
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Surreal Software" onClick={this.selectFilter}/>Surreal Sotfware
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Ubisoft Paris" onClick={this.selectFilter}/>Ubisoft Paris
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Crystal Dynamics" onClick={this.selectFilter}/>Crystal Dynamics
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Silicon Knights" onClick={this.selectFilter}/>Silicon Knights
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Ubisoft Montreal" onClick={this.selectFilter}/>Ubisoft Montreal
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Blizzard Entertainment" onClick={this.selectFilter}/>Blizzard Entertainment
                                </label>
                            </div>
                        </div>
                    </div>
                    :
                    null
                    }
                </div>
            </div>
        )
   
        return(

            <div  className="container-fluid">
            {this.props.location.pathname.toString() === "/"?
            <div className='co-md-12'> <h1>Nieuwste producten van maand { this.months[new Date().getMonth()]}! </h1> </div> 

            :
            
            <div/>
            }
            <div className='container border border-dark'>
                <div className='col-md-2'>
                    {ZijFilter}
                </div>
                <div className='col-md-1'>

            
            <div  className={"ItemsContainerScroll "}>
                {this.state.loaded? 

                    <div className='container-fluid' id='maingame'>                

                    {this.state.filteredItems.map(
                        
                        item => {

                            return (
                                <div className='col-md-5'>
                                        <div className='col-md-6'>
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
                                    
                            )
                        }
                    )}

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

            </div>
            </div>


            </div>
            </div>  
        )}
}