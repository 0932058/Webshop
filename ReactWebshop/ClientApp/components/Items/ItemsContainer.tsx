import * as React from 'react';
import { List } from "linqts";
import { ProductPage } from "../ProductPage/ProductPageContainer";
import { RouteComponentProps } from 'react-router';
import { User } from "../User/User";
import { Link, NavLink } from 'react-router-dom';
import { Product, Review } from 'ClientApp/components/Items/ItemsInterfaces';

interface ItemsContainerState{
    loaded : boolean;
    reviewsLoaded : boolean;
    items : Product[] | null; //The products get put in the list by date
    reviews : Review[];
    currentSearch : string;
    filteredItems : Product[] | null,
    consoleFilter : string[],
    uitgeverFilter : string[],
    ontwikkelaarFilter : string[],
    min : number,
    max : number,
    page : number,
    averageReviewRating: number;
}
export class ItemsContainer extends React.Component<RouteComponentProps<{}>, ItemsContainerState> {
    months : string[];

    constructor(props){
        super(props);

        this.getItems = this.getItems.bind(this);
        this.putNewItem = this.putNewItem.bind(this);
        this.setConsoleFilter = this.setConsoleFilter.bind(this);
        this.setOntwikkelaarFilter = this.setOntwikkelaarFilter.bind(this);
        this.setUitgeverFilter = this.setUitgeverFilter.bind(this);
        this.filterItems = this.filterItems.bind(this);
        this.onMinChange = this.onMinChange.bind(this);
        this.onMaxChange = this.onMaxChange.bind(this);
        this.GetAverageReviewRatingApiCall = this.GetAverageReviewRatingApiCall.bind(this);
        this.CallForAverageReviewRating = this.CallForAverageReviewRating.bind(this);
        this.getRating = this.getRating.bind(this);
        this.minAndMaxOkay = this.minAndMaxOkay.bind(this);
        this.onPrijsSubmit = this.onPrijsSubmit.bind(this);

        this.months = ["Januari", "Februari", "Maart", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ],

        this.state = {
            loaded : false,
            reviewsLoaded : false,
            items : null,
            reviews : null,
            currentSearch : "",
            filteredItems : null,
            consoleFilter : [],
            uitgeverFilter : [],
            ontwikkelaarFilter : [],

            min : 1,
            max : 999,
            page : 20,
            averageReviewRating: 0
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

        fetch('api/Review/GetAllReviews')
        .then(response => response.json() as Promise<Review[]>)
        .then(data => {
            this.setState({ reviews : data, reviewsLoaded : true});
        });
        
    }

    putNewItem(){
        fetch('api/Items/Post', {method: 'POST', headers : new Headers({'content-type' : 'application/json'})});
        this.getItems();
    }

    AddProductToShoppingCartLocalStorage(product : Product){
        var itemlist = [];
        itemlist = JSON.parse(localStorage.getItem("Winkelmand"));
        if (itemlist != null){
            var item = {"name" : product.productNaam, "id" : product.productId, "price": product.productPrijs, "index" : itemlist.length, "console": product.consoleType, "image": product.productImg};
            itemlist.push(item)
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
            
        }
        else{
            var item = {"name" : product.productNaam, "id" : product.productId, "price": product.productPrijs, "index" : 0, "console": product.consoleType, "image": product.productImg};
            itemlist = [item]
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
        }
    }

    filterIsInFilterList(filterList, filter){
        for(let f of filterList){
            if(f === filter){
                return true
            }
        }
        return false
    }

    itemPassesFilterList(filterList : string[], pCheckValue : string){
        //this loops through the given filter list to check the product check value (which is a filter category)
        for(let filter of filterList){
            if( pCheckValue.includes(filter) ){
                //if the product is already in the list
                return true
            }
        }
        return false
    }

    filterItems(){
        //we copy the items list
        let newFilteredList : Product[] = [];

        if(
            this.state.consoleFilter.length === 0 &&
            this.state.uitgeverFilter.length === 0 && 
            this.state.ontwikkelaarFilter.length === 0
        ){
            this.setState({
                filteredItems : this.state.items
            })

            return;
        }

        for(let product of this.state.items){
            let correct = [false, false, false, false];
            
            //for console filter
            if(this.itemPassesFilterList(this.state.consoleFilter, product.consoleType) || this.state.consoleFilter.length === 0){
                correct[0] = true;
            }

            //for uitgever filter
            if(this.itemPassesFilterList(this.state.uitgeverFilter, product.productUitgever) || this.state.uitgeverFilter.length === 0){
                correct[1] = true;
            }

            //for ontwikkelaar filter
            if(this.itemPassesFilterList(this.state.ontwikkelaarFilter, product.productOntwikkelaar)  || this.state.ontwikkelaarFilter.length === 0){
                correct[2] = true;
            }

            if( 
                correct[0] === true && 
                correct[1] === true &&
                correct[2] === true
            ){
                newFilteredList.push(product)
            }
        }
        this.setState({
            filteredItems : newFilteredList
        })

    }

    adaptfilter(filter, filterList){
        //check if filter is already in it, if so, pop it out
        if( this.filterIsInFilterList(filterList, filter) ){
            console.log(filter + " verwijderd")
            filterList.splice(filterList.indexOf(filter), 1)
        }else{
            //not in it? add it to the array
            console.log(filter + " in de filter list")
            filterList.push(filter)
        }

        return filterList
    }

    setConsoleFilter(event){
        this.setState({
            consoleFilter : this.adaptfilter(event.target.value, this.state.consoleFilter)
        })
        this.filterItems()
    }

    setUitgeverFilter(event){
        this.setState({
            uitgeverFilter : this.adaptfilter(event.target.value, this.state.uitgeverFilter)
        })
        this.filterItems()
    }

    setOntwikkelaarFilter(event){
        this.setState({
            ontwikkelaarFilter : this.adaptfilter(event.target.value, this.state.ontwikkelaarFilter)
        })
        this.filterItems()
    }

    onMinChange(e){
        this.setState({
            min : e.target.value
        })
    }

    onMaxChange(e){
        this.setState({
            max : e.target.value
        })
    }

    minAndMaxOkay(){
        if(this.state.min > 1 && true){

        }
    }

    onPrijsSubmit(event){
        event.preventDefault();
        if(this.minAndMaxOkay() || true){
            this.filterItems()
        }
    }

    //Not called yet, but will be called when pagination is added
    async CallForAverageReviewRating(productId: number){
        this.GetAverageReviewRatingApiCall(productId)
        .then(a => this.setState({averageReviewRating: a}))
    }
    async GetAverageReviewRatingApiCall(productId:number) : Promise<number>{
        let apiUrl = 'api/Review/Get/ ' + productId;
        let apiResponse = await fetch(apiUrl, {method: 'Get', headers: new Headers({'content-type' : 'application/json'})}); 
        let responseConverted = apiResponse.json();
        return responseConverted;
    }

    getRating(id){
        let amount = 0;
        let totRat = 0;
        this.state.reviews.map(
            (review, index) => {
                if(review.productId === id){
                    totRat += review.rating
                    amount ++
                }
            }
        )
        if(amount === 0){
            return 0
        }
        return (totRat / amount)
    }

    getReviewButtons(rating){
        var index = 1;
        var btnList = [];

        if(rating === 0){
            btnList[0] = (<p> nog geen reviews </p>)
            return btnList
        }

        while(index < 6){
            if(index <= rating){
                btnList[index] = (<p className={"glyphicon glyphicon-star yellow"}></p>)
            }else{
                btnList[index] = (<p className={"glyphicon glyphicon-star-empty"}></p>)
            }
            index += 1;
        }
        return btnList;
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
                            <form onSubmit={this.onPrijsSubmit}>
                                <label>
                                    <input type="number" min="1" max="999" value={ this.state.min } placeholder="min 1"onChange={this.onMinChange} />
                                </label>
                                <label>
                                    <p>tot </p> 
                                </label>
                                <label>
                                    <input type="number" min="1" max="999" value={ this.state.max } placeholder="max 999" onChange={this.onMaxChange} />
                                </label>
                                <button type="submit" className="btn btn-primary mb-2">Confirm identity</button>
                            </form>
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
                                    <input type="checkbox" value="Playstation3" onClick={this.setConsoleFilter}/>Playstation 3
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Playstation4" onClick={this.setConsoleFilter}/>Playstation 4
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Xbox360" onClick={this.setConsoleFilter}/>Xbox 360
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="XboxOne" onClick={this.setConsoleFilter}/>Xbox One
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
                                    <input type="checkbox" value="Bethesda" onClick={this.setUitgeverFilter}/>Bethesda
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Activision" onClick={this.setUitgeverFilter}/>Activision
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="EA_sports" onClick={this.setUitgeverFilter}/>EA Sports
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Microsoft" onClick={this.setUitgeverFilter}/>Microsoft
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sony" onClick={this.setUitgeverFilter}/>Sony
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Realtime Worlds" onClick={this.setUitgeverFilter}/>Realtime Worlds
                                </label>
                                <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Electronic Arts" onClick={this.setUitgeverFilter}/>Electronic Arts
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Trion Worlds" onClick={this.setUitgeverFilter}/>Trion Worlds
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Disney Interactive Studios" onClick={this.setUitgeverFilter}/>Disney Interactive Entertainment
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Square" onClick={this.setUitgeverFilter}/>Square
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sony Computer Entertainment" onClick={this.setUitgeverFilter}/>Sony Computer Entertainment
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Rockstar Games" onClick={this.setUitgeverFilter}/>Rockstar Games
                                </label>
                                <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Microsoft Game Studios" onClick={this.setUitgeverFilter}/>Microsoft Game Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="THQ" onClick={this.setUitgeverFilter}/>THQ
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Konami" onClick={this.setUitgeverFilter}/>Konami
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sega" onClick={this.setUitgeverFilter}/>Sega
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Cloud Imperium Games" onClick={this.setUitgeverFilter}/>Cloud Imperium Games
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Warner Bros. Interactive Entertainment" onClick={this.setUitgeverFilter}/>Warner Bros
                                </label>
                                <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Ubisoft" onClick={this.setUitgeverFilter}/>Ubisoft
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Square Enix" onClick={this.setUitgeverFilter}/>Square Enix
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Blizzard Entertainment" onClick={this.setUitgeverFilter}/>Blizzard Entertainment
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
                                    <input type="checkbox" value="Bethesda" onClick={this.setOntwikkelaarFilter}/>Bethesda
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Activision" onClick={this.setOntwikkelaarFilter}/>Activision
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="EA_sports" onClick={this.setOntwikkelaarFilter}/>EA Sports
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Microsoft" onClick={this.setOntwikkelaarFilter}/>Microsoft
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sony" onClick={this.setOntwikkelaarFilter}/>Sony
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Realtime Worlds" onClick={this.setOntwikkelaarFilter}/>Realtime Worlds
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Beachhead Studios" onClick={this.setOntwikkelaarFilter}/>Beachhead Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Crytek Frankfurt" onClick={this.setOntwikkelaarFilter}/>Crytek Frankfurt
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sony Online Entertainment" onClick={this.setOntwikkelaarFilter}/>Sony Online Entertainment
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="High Moon Studios" onClick={this.setOntwikkelaarFilter}/>High Moon Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Trion Worlds" onClick={this.setOntwikkelaarFilter}/>Trion Worlds
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Bungie" onClick={this.setOntwikkelaarFilter}/>Bungie
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Avalanche Software" onClick={this.setOntwikkelaarFilter}/>Avalanche Software
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Square" onClick={this.setOntwikkelaarFilter}/>Square
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Polyphony Digital" onClick={this.setOntwikkelaarFilter}/>Polyphony Digital
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Rockstar North" onClick={this.setOntwikkelaarFilter}/>Rockstar North
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Ensemble Studios" onClick={this.setOntwikkelaarFilter}/>Ensemble Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Quantic Dream" onClick={this.setOntwikkelaarFilter}/>Quantic Dream
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Kaos Studios" onClick={this.setOntwikkelaarFilter}/>Koas Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Team Bondi" onClick={this.setOntwikkelaarFilter}/>Team Bondi
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Rockstar Studios" onClick={this.setOntwikkelaarFilter}/>Rockstar Studios
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Kojima Productions" onClick={this.setOntwikkelaarFilter}/>Kojima Productions
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Rockstar San Diego" onClick={this.setOntwikkelaarFilter}/>Rockstar San Diego
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Sega AM2" onClick={this.setOntwikkelaarFilter}/>Sega AM2
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Cloud Imperium Games" onClick={this.setOntwikkelaarFilter}/>Cloud Imperium Games
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="BioWare" onClick={this.setOntwikkelaarFilter}/>BioWare
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Funcom" onClick={this.setOntwikkelaarFilter}/>Funcom
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Surreal Software" onClick={this.setOntwikkelaarFilter}/>Surreal Sotfware
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Ubisoft Paris" onClick={this.setOntwikkelaarFilter}/>Ubisoft Paris
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Crystal Dynamics" onClick={this.setOntwikkelaarFilter}/>Crystal Dynamics
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Silicon Knights" onClick={this.setOntwikkelaarFilter}/>Silicon Knights
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Ubisoft Montreal" onClick={this.setOntwikkelaarFilter}/>Ubisoft Montreal
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Blizzard Entertainment" onClick={this.setOntwikkelaarFilter}/>Blizzard Entertainment
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
                <div className='col-md-10'>

            
            <div  className={"ItemsContainerScroll "}>
                {this.state.loaded && this.state.reviewsLoaded? 

                    <div className='container' id='maingame'>      
                    <h3> { "Aantal producten gevonden: " + this.state.filteredItems.length } </h3>          
                    
                    {this.state.filteredItems.map(
                        
                        (item, index) => {

                            if( (this.state.page) >= index.valueOf() && ( (this.state.page) - 20) <= index.valueOf() ) {return (
                                <div className='col-md-10'>
                                <p>______________________________________________________________________________________________________</p>
                                <p></p>
                                        <div className='col-md-2'>
                                            <NavLink to={'/Item/'+ item.productId}><img className="img-responsive" src={ item.productImg }/></NavLink>
                                        </div>
                                        <div className='col-md-5'> 
                                            <h4><b>{ item.productNaam }</b> </h4>
                                            <p id='main_omschrijving'> {item.productOmschr} </p>
                                            <p><b>Console:</b>{item.consoleType}</p>
                                        </div>
                                        <div className='col-md-3'>
                                            <h3> Prijs: {"€" + item.productPrijs } </h3>                                         
                                            <p> { item.aantalInVooraad + " " } op voorraad </p>
                                            <p> Rating: { this.getReviewButtons(this.getRating(item.productId)) } </p>


                                            <NavLink to={ '/Item/' + item.productId } exact activeClassName='Active'className='button_to_product'>
                                                <button className={"btn btn-primary"} > naar product </button>
                                            </NavLink>
                                            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModalM" onClick={ () => this.AddProductToShoppingCartLocalStorage(item) }>+ in winkelmand</button>
                                            <div className="modal fade" id="myModalM" role="dialog">
                                                <div className="modal-dialog modal-sm">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                    <h4 className="modal-title">Product is toegevoegd!</h4>
                                                    </div>
                                                    <div className="modal-body">
                                                    <p> Het item is succesvol toegevoegd aan de winkelmand</p>
                                                    <button type="button" className="btn btn-default" data-dismiss="modal" data-backdrop="false">verder winkelen</button>
                                                    <a href='/Winkelmand'><button type="button" className="btn btn-default" data-backdrop="false" >naar winkelmand</button></a>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                    
                            )
                        }
                        }
                    )}
                    
                    <div className='col-md-10'> 
                        <ul className="pagination">
                        <li > <button className={"btn btn-default"} onClick={()=> this.setState({ page : this.state.page - 20 })} >{"<-"} vorige</button> </li>
                        

                            {
                                this.state.filteredItems.map(
                                    (item, index) => {
                                        if( index % 20 == 0 && index < (this.state.page + 100) && index > (this.state.page - 100) && index != 0){
                                            return (
                                                <li ><button className={"btn btn-primary"} onClick={() => this.setState({ page : index})}> {index / 20} </button></li>
                                            )
                                        }else{
                                            if((index + 1) === this.state.filteredItems.length){
                                                
                                                    <li ><button className={"btn btn-primary"} onClick={() => this.setState({ page : index})}> laatste pagina </button></li>
                                                
                                            }
                                        }
                                    }
                                )
                            }

                            <li > <button className={"btn btn-default"} onClick={()=> this.setState({ page : this.state.page + 20 })} >volgende -></button> </li>   
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

            </div>
            </div>


            </div>
            </div>  
        )}
}