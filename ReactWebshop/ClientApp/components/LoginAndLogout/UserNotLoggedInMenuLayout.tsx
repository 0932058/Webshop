import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Redirect } from 'react-router'
import { RouteComponentProps } from 'react-router';

//The navigation menu of the top bar when the user is not logged in
interface topBarState {
    search : string
}

export class UserNotLoggedInMenu extends React.Component<RouteComponentProps<{}>, topBarState> {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            search : ""
        }
    }

    handleChange(event){
        this.setState({
            search : event.target.value
        })
    }

    public render() {
        return (
            <div>
                <input type="text" id="one" onKeyPress={this.handleChange} />
                {
                    this.state.search === "olaf"? <img src="https://i.ytimg.com/vi/V4MF2s6MLxY/maxresdefault.jpg" /> : null
                }

                {
                    this.state.search === "stefan"? <img src="https://memegenerator.net/img/instances/500x/58771697/database-guy.jpg" /> : null
                }

                {
                    this.state.search === "mika"? <img src="http://i.imgur.com/FGW3IC0.jpg" /> : null
                }

                {
                    this.state.search === "felix"? <img src="https://i.ytimg.com/vi/qafe_FqKb88/maxresdefault.jpg" /> : null
                }

                {
                    this.state.search === "lucas"? <img src="https://i.ytimg.com/vi/p65rX6k1TMU/maxresdefault.jpg" /> : null
                }

                {
                    this.state.search === "deerk"? <img src="https://i.ytimg.com/vi/33LGmZ1mxkA/maxresdefault.jpg" /> : null
                }

                {
                    this.state.search === "da wea" || this.state.search === "da wea" ? <img src="https://i.ytimg.com/vi/eix7fLsS058/hqdefault.jpg?sqp=-oaymwEXCPYBEIoBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC2sRKpVY7qw232eLXutCSjxE-RJw" /> : null
                }
            </div>
        )
    }
}