import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface WinkelmandState {
    Storage: string | null;
}

class codGame{
    price: Number;

    constructor(){
        this.price = 50;
    }
}

export class Winkelmand extends React.Component<RouteComponentProps<{}>, WinkelmandState> {
    constructor(){
        super();

        var game = new codGame();


        this.add = this.add.bind(this);
        this.retrieve = this.retrieve.bind(this);
        localStorage.setItem('wenslijst', JSON.stringify({list: [game] }));
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

        voorbeeld.list[0].price = 20;

        localStorage.setItem('wenslijst', JSON.stringify(voorbeeld));
        
        voorbeeld = JSON.parse(String(localStorage.getItem('wenslijst')));

        return <div>
            
                <div>
                    <h1>{ voorbeeld.list[0].price }</h1>
                </div>
            </div>;
    }
}
