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
        localStorage.setItem('wenslijst', JSON.stringify({list: [{price: 50}] }));
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

        var voorbeeld = JSON.parse(String(localStorage.getItem('wenslijst')));
;
        return <div>
                <div>
                    <h1>{ voorbeeld.list[0].price }</h1>
                </div>
            </div>;
    }
}
