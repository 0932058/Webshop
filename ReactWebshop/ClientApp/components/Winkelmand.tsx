import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface WinkelmandState {
    Storage: string | null;
}

export class Winkelmand extends React.Component<RouteComponentProps<{}>, WinkelmandState> {
    constructor(){
        super();

        this.add = this.add.bind(this);
        this.retrieve = this.retrieve.bind(this);
        this.state = { Storage: "doesnt work" }
    }

    add(){
        var Storage = localStorage.getItem("works");

        this.setState({
            Storage
        });
    }

    retrieve(){
        return this.state.Storage;
    }

    public render() {

        return <div>
                <button onClick={this.add}></button>
                <div>
                    <h1>{ this.state.Storage }</h1>
                </div>
            </div>;
    }
}
