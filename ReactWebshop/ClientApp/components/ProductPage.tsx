import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image'

export class ProductPage extends React.Component<RouteComponentProps<{}>, {}> {
    constructor(){
        super();
        this.CreateGamesAndLocalStorage = this.CreateGamesAndLocalStorage.bind(this);
        this.ConvertJson = this.ConvertJson.bind(this);
    }
    //Adds games to the local storage
    CreateGamesAndLocalStorage(){
        
    }
    ConvertJson() : any{
        //hier wordt de value van wenslijst naar string gecast om vervolgens naar een JSON object te worden gecast
         
    }
    //This will get called when the component gets mounted (loaded)
    componentWillMount(){
        this.CreateGamesAndLocalStorage();
        this.ConvertJson()

    }
    render() {
        return <div>      
                <h1>Bestellingen</h1>        
            </div>; 
    }
}
