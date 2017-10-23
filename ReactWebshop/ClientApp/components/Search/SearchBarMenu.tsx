import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {SearchContainer} from "./SearchContainer";
import { Redirect } from 'react-router';
import { RouteComponentProps } from 'react-router';

interface SearchBarState{
    searchbarText:string;
    isSearchbarButtonClicked: boolean
}
export class SearchBarMenu extends React.Component<{}, SearchBarState> {
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
        localStorage.setItem("searchBox", this.state.searchbarText); 

        // event.preventDefault(); this causes the reloading of the page
        this.ActivateSearchButton();
    }

    //When the button is pressed, then it gets redirect to the search page.
    public render() {
        return (   
        <div>           
            <div className={"SearchButton"}>          
            <form onSubmit={this.HandleSearchBarSubmit}>
            <label>
            <input type="text" value={this.state.searchbarText} onChange={this.HandleSearchBarChange} /> 
            </label>
            <input type="Submit" value="Zoeken"/>
            </form>
            </div>         
            {this.state.isSearchbarButtonClicked ?
            <Redirect to={"/Search"} push={true}/>
            :
            <div> 
            </div>   
        }      
        </div>);
    }
}
export default SearchBarMenu;