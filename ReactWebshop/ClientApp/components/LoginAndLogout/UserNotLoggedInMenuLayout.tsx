import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Redirect } from 'react-router'

//The navigation menu of the top bar when the user is not logged in
interface topBarState {
    text : string;
    redirect : boolean;
}

export class UserNotLoggedInMenu extends React.Component<{}, topBarState> {
    constructor(){
        super();

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            text : "",
            redirect : false,
        }
    }

    handleChange(event : any) {
        event.preventDefault()
        this.setState({
            text : event.target.value,
        }) 
        sessionStorage
    }

    handleSubmit() {
        sessionStorage.setItem("search", this.state.text)
        this.setState({
            redirect : true
        })
    }

    public render() {
        return <nav className="UserNotLoggedInMenuLayout">
                            <NavLink to={ '/' } exact activeClassName='active' className='LinksNav'>
                                Home
                            </NavLink>

                            <NavLink to={ '/Login' } exact activeClassName='active'className='LinksNav'>
                                Login
                            </NavLink>

                            <NavLink to={ '/Registratie' } exact activeClassName='active'className='LinksNav'>
                                Registreer
                            </NavLink>

                            <NavLink to={ '/Winkelmand' } exact activeClassName='active'className='LinksNav'>
                                Winkelmand
                            </NavLink>

                            <form onSubmit={ this.handleSubmit }>
                                
                                <input type="text" value={this.state.text} onChange={this.handleChange} />
                                <input type="submit" value="Search it!" />
                            </form>

                            {
                                this.state.redirect && <Redirect to="/Search" />
                            }
        </nav>;
    }
}