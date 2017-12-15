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
            console.log('api/Items' + this.props.location.pathname)
        }


        fetch(api)
        .then(response => response.json() as Promise<Product[]>)
        .then(data => {
            this.setState({ items : data, filteredItems : data, loaded : true});
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

    filterItems(){
        //we copy the items list
        let splicedList = this.state.items

        for(let filter of this.state.filters){
            console.log(filter)
        }
    }

    selectFilter(pFilter){
        let filters = this.state.filters
        for(let filter of this.state.filters){
            if(filter === pFilter){
                console.log("nothing")
                filters.splice(filters.indexOf(filter), 1)
                this.setState({
                    filters
                })
                this.filterItems()
                return;
            }
        }

        filters.push(pFilter)

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
                <div id="collapse4" className="collapse">
                    
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" href="#collapse2" >Console</a>
                            </h4>
                        </div>
                        <div id="collapse2" className="panel-collapse collapse in">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="Playstation3" onClick={() => this.selectFilter("Playstation3")} />Playstation 3
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/>Playstation 4
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/>Xbox 360
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/>Xbox One
                                </label>
                            </div>
                        </div>
                    </div>
        
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" href="#collapse1">Categorie</a>
                            </h4>
                        </div>
                        <div id="collapse1" className="panel-collapse collapse in">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/>Action
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/>Shooter
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/>Fantasie
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/>Sport
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/>Sandbox
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/>Fight
                                </label>
                            </div>
                        </div>
                    </div>
        
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" href="#collapse3">Accessoires</a>
                            </h4>
                        </div>
                        <div id="collapse3" className="panel-collapse collapse in">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/>Headsets
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value=""/>Racewheels
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
                <div className='col-md-10'>

            
            <div  className={"ItemsContainerScroll"}>
                {this.state.loaded? 

                    this.state.filteredItems.map(
                        
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