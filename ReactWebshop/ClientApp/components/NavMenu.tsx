import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {SearchContainer} from "./Search/SearchContainer";

//Navigation menu with the search bar

interface SearchBarState{
    searchbarText:string;
    isSearchbarButtonClicked: boolean
}

export class NavMenu extends React.Component<{}, SearchBarState> {
    constructor(){
        super();
        this.state = {searchbarText: "", isSearchbarButtonClicked:false}
        this.HandleSearchBarChange = this.HandleSearchBarChange.bind(this);
        this.HandleSearchBarSubmit = this.HandleSearchBarSubmit.bind(this);
        this.ResetSearchButton = this.ResetSearchButton.bind(this);
        this.ActivateSearchButton = this.ActivateSearchButton.bind(this);      
    }
    ResetSearchButton(){
        this.setState({isSearchbarButtonClicked: false})
    }
    ActivateSearchButton(){
        this.setState({isSearchbarButtonClicked: true})
    }
    //When the user types something in the form, this method is then called
    HandleSearchBarChange(event: any){
        this.ResetSearchButton();
        this.setState({searchbarText: event.target.value});         
    }
    //When the user clicks on enter or clicks the button, this method gets called
    HandleSearchBarSubmit(event: any){
        event.preventDefault();
        this.ActivateSearchButton();
    }
    public render() {
        return <nav className="homebalk">
                            <NavLink to={ '/' } exact activeClassName='active' className='LinksNav'>
                                Home
                            </NavLink>
                            <NavLink to={ '/ProductPage' } exact activeClassName='active'className='LinksNav'>
                                ProductPage
                            </NavLink>
                            <NavLink to={ '/Bestellingen' } exact activeClassName='active'className='LinksNav'>
                                Bestellingen
                            </NavLink>
                            <NavLink to={ '/Wenslijst' } exact activeClassName='active'className='LinksNav'>
                                Wenslijst
                            </NavLink>
                            <NavLink to={ '/Winkelmand' } exact activeClassName='active'className='LinksNav'>
                                    Winkelmand
                            </NavLink>
            
            <form onSubmit={this.HandleSearchBarSubmit}>
            <label>
            <input type="text" value={this.state.searchbarText} onChange={this.HandleSearchBarChange} /> 
            </label>
            <input type="Submit" value="Zoeken"/>
            </form>
            {this.state.isSearchbarButtonClicked?
            <SearchContainer searchBarText={this.state.searchbarText}/>
            :
            <div> </div>      
        }
        </nav>;
    }
}
